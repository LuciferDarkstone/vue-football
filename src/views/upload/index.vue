<template>
  <el-upload :http-request="Upload" :multiple="true" :show-file-list="false" action="http://gongbaojiding.oss-cn-huhehaote.aliyuncs.com">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import { client } from '@/utils/ali'

export default {
  methods: {
    Upload(file) {
      const fileName = 'bear'
      // 定义唯一的文件名，打印出来的uid其实就是时间戳
      client().put(fileName, file.file).then(res => {
        // 下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
        this.fileList[0] = {
          'name': res.name,
          'url': res.url
        }
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      })
    }
  }
}
</script>

