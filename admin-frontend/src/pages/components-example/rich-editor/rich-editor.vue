<template>
  <admin-card flex-direction="column" height="100%" margin="0">
    <toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
    ></toolbar>
    <editor
      v-model="html"
      style="height: 100%; overflow-y: hidden"
      @on-created="handleCreated"
    ></editor>
  </admin-card>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import AdminCard from '@components/admin-card/admin-card.vue';

const editorRef = ref();
const html = ref();

const handleCreated = editor => {
  editorRef.value = editor;
};
</script>

<style lang="scss" scoped></style>
