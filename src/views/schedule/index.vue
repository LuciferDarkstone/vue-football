<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">
        添加赛程
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="球队A">
        <template slot-scope="scope">
          <router-link :to="'/team/player/'+scope.row.id" class="link-type">
            <span>{{ scope.row.team_a }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="球队B">
        <template slot-scope="scope">
          <router-link :to="'/team/player/'+scope.row.id" class="link-type">
            <span>{{ scope.row.team_b }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="比赛场地">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="比赛类型" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="160">
        <template slot-scope="{row}">
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
        <el-form-item label="球队A" prop="schedule">
          <el-input v-model="temp.team_a" />
        </el-form-item>
        <el-form-item label="球队B" prop="schedule">
          <el-input v-model="temp.team_b" />
        </el-form-item>
        <el-form-item label="比赛场地" prop="address">
          <el-input v-model="temp.position" />
        </el-form-item>
        <el-form-item label="比赛类别" prop="avatar">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in typeOptions" :key="item.type" :label="item.name" :value="item.type" />
          </el-select>
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
import { getSchedule, addSchedule, updateSchedule } from '@/api/schedule'

export default {
  name: 'Schedule',
  filters: {
    statusFilter(status) {
      const statusMap = {
        enable: 'success',
        disable: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      const typeMap = {
        '1': '杯赛',
        '2': '小组赛',
        '3': '循环赛'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      statusOptions: ['enable', 'disable'],
      typeOptions: [
        {
          type: '1',
          name: '杯赛'
        },
        {
          type: '2',
          name: '小组赛'
        },
        {
          type: '3',
          name: '循环赛'
        }
      ],
      temp: {
        id: undefined,
        team_a: '',
        team_b: '',
        position: '',
        type: '',
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
    const id = this.$route.params && this.$route.params.id
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      getSchedule(id).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        team_a: '',
        team_b: '',
        position: '',
        type: '',
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
          addSchedule(this.temp).then(() => {
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
          updateSchedule(tempData).then(() => {
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
