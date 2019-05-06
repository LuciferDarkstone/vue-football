<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">
        添加球队
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="队标" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>

      <el-table-column label="球队名">
        <template slot-scope="scope">
          <router-link :to="'/team/player/'+scope.row.id" class="link-type">
            <span>{{ scope.row.team }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="学校">
        <template slot-scope="scope">
          <span>{{ scope.row.school }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="259">
        <template slot-scope="{row}">
          <router-link :to="'/team/player/'+row.id">
            <el-button type="primary" size="mini" icon="el-icon-search">
              查看队员
            </el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status=='disable'" size="mini" type="success" @click="handleModifyStatus(row,'enable')">
            启用
          </el-button>
          <el-button v-if="row.status=='enable'" size="mini" type="danger" @click="handleModifyStatus(row,'disable')">
            停用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="id" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="球队" prop="team">
          <el-input v-model="temp.team" />
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="temp.school" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getTeam, addTeam, updateTeam } from '@/api/team'

export default {
  name: 'Team',
  filters: {
    statusFilter(status) {
      const statusMap = {
        enable: 'success',
        disable: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      statusOptions: ['enable', 'disable'],
      temp: {
        id: undefined,
        team: '',
        school: '',
        avatar: '',
        status: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTeam().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        team: '',
        school: '',
        avatar: '',
        status: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          addTeam(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateTeam(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
