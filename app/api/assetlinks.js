export default function handler(req, res) {
    const assetlinks = [{
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.hoydoon.app",
        "sha256_cert_fingerprints": [
          "38:42:FE:05:1D:DA:12:58:5D:8E:0C:53:C8:C1:1A:A4:DA:ED:E7:96:B1:20:AF:E8:E4:CB:5E:00:8C:D7:62:8E"
        ]
      }
    }];
   
    res
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .send(JSON.stringify(assetlinks));
  }