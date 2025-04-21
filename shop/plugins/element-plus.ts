import { ElButton, ElSelect, ElInput, ElMessage } from 'element-plus';
import { App } from 'vue';

export default {
  install(app: App) {
    app.use(ElButton);
    app.use(ElSelect);
    app.use(ElInput);
    app.config.globalProperties.$message = ElMessage;
  }
};