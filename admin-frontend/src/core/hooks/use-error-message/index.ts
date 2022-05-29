import { ElMessage } from 'element-plus';

export const useErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    ElMessage.warning(error.message);
  } else if (typeof error === 'string') {
    ElMessage.warning(error);
  } else {
    console.error(error);
  }
};
