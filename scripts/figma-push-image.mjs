// Kirim gambar lokal ke node Figma lewat server Claude Talk to Figma (ws://localhost:3055).
// Pemakaian: node scripts/figma-push-image.mjs <channel> <nodeId> <file> [FILL|FIT]
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const [channel, nodeId, file, scaleMode = 'FILL'] = process.argv.slice(2);
if (!channel || !nodeId || !file) { console.error('pakai: <channel> <nodeId> <file> [FILL|FIT]'); process.exit(1); }
const imageData = readFileSync(file).toString('base64');
const ws = new WebSocket('ws://localhost:3055');
const send = (o) => ws.send(JSON.stringify(o));
const cmdId = randomUUID();
let sent = false;
const done = (code, msg) => { console.log(msg); ws.close(); process.exit(code); };
setTimeout(() => done(1, 'timeout'), 30000);

ws.onopen = () => send({ id: randomUUID(), type: 'join', channel, sessionId: 'push-image-' + Date.now() });
ws.onmessage = (ev) => {
  const d = JSON.parse(ev.data);
  if (!sent && d.type === 'system' && /joined channel/i.test(JSON.stringify(d.message ?? d))) {
    sent = true;
    send({ id: cmdId, type: 'message', channel,
      message: { id: cmdId, command: 'set_image', params: { nodeId, imageData, scaleMode, commandId: cmdId } } });
    return;
  }
  const m = d.message;
  if (m && m.id === cmdId && (m.result !== undefined || m.error !== undefined)) {
    done(m.error ? 1 : 0, m.error ? 'ERROR: ' + JSON.stringify(m.error) : 'OK: ' + JSON.stringify(m.result).slice(0, 200));
  }
};
ws.onerror = (e) => done(1, 'ws error: ' + (e.message || e));
