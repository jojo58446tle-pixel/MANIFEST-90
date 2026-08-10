# MANIFEST 90

พร้อม Deploy บน Netlify พร้อม Password Login, Netlify Blobs persistence และ Daily Accountability Reminder เวลา 19:00 Asia/Bangkok

## Deploy

1. อัปโหลดโฟลเดอร์นี้เข้า GitHub แล้วเชื่อมกับ Netlify หรือ Deploy ผ่าน Netlify CLI
2. Netlify จะใช้ `npm run build` และ publish โฟลเดอร์ `dist` ตาม `netlify.toml`
3. ตั้ง Environment Variables ใน Netlify:

- `MANIFEST_PASSWORD` — รหัสผ่านสำหรับเข้าแอป
- `DINGTALK_WEBHOOK_URL` — DingTalk Workflow Webhook
- `DINGTALK_SECRET` — DingTalk signing secret

ห้ามใส่ค่าจริงลงในไฟล์หรือ Git

## Daily Reminder

Scheduled Function ใช้ cron `0 12 * * *` เพราะ Netlify ใช้ UTC ซึ่งตรงกับ 19:00 ประเทศไทย ระบบจะอ่าน State จริงจาก Netlify Blobs, ส่งสูงสุดวันละหนึ่งครั้ง และไม่ส่งเมื่อ Mission วันนี้ครบทั้งหมด

ปุ่ม “ทดสอบ DingTalk ตอนนี้” ในหน้าโปรไฟล์ไม่สร้าง Daily notification log จึงไม่กระทบการส่งตามเวลา
