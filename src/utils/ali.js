import OSS from 'ali-oss'

export function client() {
  const client = new OSS({
    region: 'oss-cn-huhehaote',
    accessKeyId: 'LTAIEGiDIiHHDHy0',
    accessKeySecret: 'RZzppGzoxddQJDcHoWVB48i5KyIP4z',
    bucket: 'gongbaojiding'
  })

  return client
}
