การกำหนด codec profile จะใช้ได้เฉพาะส่วนที่ Browser Support เท่านั้น

Linphone Codec H264 Support

```
profile-level-id=42801F
```

Codec iOS Safari Ipad

```json
[
    { "clockRate": 90000, "mimeType": "video/H264", "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640c1f" },
    { "clockRate": 90000, "mimeType": "video/rtx" },
    { "clockRate": 90000, "mimeType": "video/H264", "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f" },
    { "clockRate": 90000, "mimeType": "video/H264", "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=640c1f" },
    { "clockRate": 90000, "mimeType": "video/H264", "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f" },
    { "clockRate": 90000, "mimeType": "video/VP8" },
    { "clockRate": 90000, "mimeType": "video/VP9", "sdpFmtpLine": "profile-id=0" },
    { "clockRate": 90000, "mimeType": "video/red" },
    { "clockRate": 90000, "mimeType": "video/ulpfec" }
]
```

Codec MacOS Safari Support

```json
[
    {
        // ใช้ได้
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f"
    },
    {
        // ใช้ไม่ได้จอดำ
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640c1f"
    },
    {
        // ใช้ไม่ได้จอดำ
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=640c1f"
    },
    {
        // ใช้ได้
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/VP8"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/VP9",
        "sdpFmtpLine": "profile-id=0"
    }
]
```

Codec Chrome Support

```json
[
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d001f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=4d001f"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/AV1"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/VP8"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/VP9",
        "sdpFmtpLine": "profile-id=0"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/VP9",
        "sdpFmtpLine": "profile-id=2"
    },
    {
        "clockRate": 90000,
        "mimeType": "video/H264",
        "sdpFmtpLine": "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032"
    }
]
```
