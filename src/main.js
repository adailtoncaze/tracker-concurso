import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createClient } from '@supabase/supabase-js'
import './assets/styles/tailwind.css'
import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


const supabaseUrl = 'https://gfjffcsvurordhidfueg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamZmY3N2dXJvcmRoaWRmdWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMTgwNDUsImV4cCI6MjAzNTY5NDA0NX0.zdayvtjGDf8oOjri4BycRXMJ7w3faJfS2wAb8BX3_pA'
export const supabase = createClient(supabaseUrl, supabaseKey)

createApp(App)
  .use(router)
  .use(Toast, {
    position: "top-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  })
  .mount('#app')
