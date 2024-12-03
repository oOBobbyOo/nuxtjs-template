<script setup lang="ts">
// @see https://sangtian152.github.io/vue3-tree-org/demo/#attributes
import v3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'

const Vue3TreeOrg = v3TreeOrg.Vue3TreeOrg

const data = {
  id: 1,
  label: 'xxx科技有限公司',
  childrens: [
    {
      id: 2,
      pid: 1,
      label: '产品研发部',
      style: { color: '#fff', background: '#108ffe' },
      childrens: [
        { id: 6, pid: 2, label: '禁止编辑节点', disabled: true },
        { id: 8, pid: 2, label: '禁止拖拽节点', noDragging: true },
        { id: 10, pid: 2, label: '测试' },
      ],
    },
    {
      id: 3,
      pid: 1,
      label: '客服部',
      childrens: [
        { id: 11, pid: 3, label: '客服一部' },
        { id: 12, pid: 3, label: '客服二部' },
      ],
    },
    { id: 4, pid: 1, label: '业务部' },
  ],
}

const horizontal = ref(false) // 是否是横向
const collapsable = ref(false) // 是否可以展开收起节点
const disabled = ref(false) // 是否禁止编辑
const onlyOneNode = ref(false) // 是否仅拖动当前节点
const cloneNodeDrag = ref(true) // 是否拷贝节点拖拽

const style = ref({
  color: '#5e6d82',
  background: '#fff',
})

// 节点拖拽结束前钩子
function beforeDragEnd(node: any, targetNode: any) {
  console.log('[ node, targetNode ] >>:', node, targetNode)
}

// 节点拖拽结束
function nodeDragMove(data: any) {
  console.log('[ data ] >>:', data)
}

// 节点拖拽结束事件
function nodeDragEnd(node: any, isSelf: any) {
  console.log('[ node, isSelf ] >>:', node, isSelf)
}

// 右键菜单点击事件
function onMenus({ node, command }: { node: any; command: string }) {
  console.log('[ node, command ] >>:', node, command)
}

// 节点展开事件
function onExpand(e: MouseEvent, data: any) {
  console.log('[ e, data ] >>:', e, data)
}

// 节点双击事件
function onNodeDblclick(e: MouseEvent, data: any) {
  console.log('[ e, data ] >>:', e, data)
}

// 节点点击事件
function onNodeClick(e: MouseEvent, data: any) {
  console.log('[ e, data ] >>:', e, data)
}
</script>

<template>
  <div class="wh-full flex flex-col">
    <div class="mb-3 flex flex-wrap gap-6 b-rd-1 bg-white p-6 dark:bg-dark">
      <div class="text-sm text-gray-6">
        <label>横向：</label>
        <el-switch v-model="horizontal" />
      </div>
      <div class="text-sm text-gray-6">
        <label>可收起：</label>
        <el-switch v-model="collapsable" />
      </div>
      <div class="text-sm text-gray-6">
        <label>禁止编辑：</label>
        <el-switch v-model="disabled" />
      </div>
      <div class="text-sm">
        <label>仅拖动当前节点：</label>
        <el-switch v-model="onlyOneNode" />
      </div>
      <div class="text-sm text-gray-6">
        <label>拖动节点副本：</label>
        <el-switch v-model="cloneNodeDrag" />
      </div>
      <div class="text-sm text-gray-6">
        <label>背景色：</label>
        <el-color-picker v-model="style.background" size="small" />
      </div>
      <div class="text-sm text-gray-6">
        <label>文字颜色：</label>
        <el-color-picker v-model="style.color" size="small" />
      </div>
    </div>

    <div class="flex-1">
      <Vue3TreeOrg
        :data="data"
        center
        :props="{ children: 'childrens' }"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :disabled="disabled"
        :label-style="style"
        :only-one-node="onlyOneNode"
        :clone-node-drag="cloneNodeDrag"
        :before-drag-end="beforeDragEnd"
        @on-node-drag="nodeDragMove"
        @on-node-drag-end="nodeDragEnd"
        @on-contextmenu="onMenus"
        @on-expand="onExpand"
        @on-node-dblclick="onNodeDblclick"
        @on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>

<style scoped></style>
