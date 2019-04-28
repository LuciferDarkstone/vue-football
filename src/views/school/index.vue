<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学校">
        <template slot-scope="scope">
          <router-link :to="'/school/admin/'+scope.row.id" class="link-type">
            <span>{{ scope.row.school }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学校所在地">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="150">
        <template slot-scope="scope">
          <router-link :to="'/school/admin/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-search">
              管理员
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getSchool } from '@/api/school'

export default {
  name: 'School',
  filters: {
    statusFilter(status) {
      const statusMap = {
        running: 'success',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSchool().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
