<template>
  <div class="tag" :class="{ active: isActive }" @click="handleToPage">
    {{ name }}
    <el-icon
      v-if="closeIcon"
      class="close-icon"
      :style="{
        width: isActive ? '1em' : '',
      }"
      @click.stop="handleClose"
      ><close></close
    ></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import {
  removeCurrentMenus,
  setActiveMenuId,
  useMenuStore,
} from '@core/pinia/stores/menu-store';
import { Close } from '@element-plus/icons-vue';
const props = defineProps({
  closeIcon: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const { activeMenuId } = toRefs(useMenuStore());
const isActive = computed(() => {
  return activeMenuId.value === props.id;
});

const handleToPage = () => {
  router.replace(props.path);
  setActiveMenuId(props.id);
};

const handleClose = () => {
  const nextMenu = removeCurrentMenus(props.id);
  router.replace(nextMenu.menuPath);
};
</script>

<style lang="scss" scope>
.tag {
  display: flex;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  user-select: none;
  margin-right: 4px;
  align-items: center;
  border: 1px solid #42b983;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  .close-icon {
    width: 0;
    padding: 2px;
    margin-left: 5px;
    border-radius: 50%;
    transition: inherit;

    &:hover {
      color: #fff;
      background-color: #b4bccc;
    }
  }

  &:hover {
    .close-icon {
      width: 1em;
    }
  }
}

.active {
  background-color: #42b983;
  border-color: transparent;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
