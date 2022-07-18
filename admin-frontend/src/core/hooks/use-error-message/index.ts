import { AdminError } from '@core/http/admin-error';
import { ElMessage } from 'element-plus';

export const useErrorMessage = (error: unknown) => {
  if (error instanceof AdminError) {
    ElMessage.warning(error.message);
  } else {
    console.error(error);
  }
};
