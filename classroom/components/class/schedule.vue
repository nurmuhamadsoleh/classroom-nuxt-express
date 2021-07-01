<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-1 text-center">
          <div class="badge badge-warning text-center rounded-circle mt-3">
            <i class="far fa-calendar-check fa-3x"></i>
          </div>
        </div>
        <div class="col-10">
          <h5>{{data.name}}</h5>
          <p>{{formatDate(data.start)}} - {{formatDate(data.end)}}</p>
          <h5>Bahan Materi</h5>
          <ul v-for="material in data.materials" :key="material.id" >
              <li> <a :href="`${$axios.defaults.baseURL}/file/`+material.file" class="btn btn-md btn-danger" target="_blank"> {{material.name}} </a></li>
          </ul>
           <div class="card-body">
              <button class="btn btn-primary" data-toggle="modal" data-backdrop="false" data-target="#exampleModal">Absen</button>
          </div>
        </div>
        <div class="col-1 text-center">
          <i class="fas fa-ellipsis-v mt-3"></i>
        </div>
      </div>
    </div>


       <div class="modal hide fade in" tabindex="-1" role="dialog" id="exampleModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <center>
              <div class="modal-header">
                <h5 class="modal-title">Scan Barcode Untuk Absensi</h5> 
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              </center>
              <div class="modal-body">
                <img class="col-md-12" :src="img" alt="">
              </div>
              <div class="modal-footer bg-whitesmoke br">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
  </div>
  
</template>
<script>

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import QRCode from 'qrcode'
import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

export default {

  mounted(){
const generateQR = async text => {
  try {
   this.img = await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}
generateQR(this.data.id)


  },
  data(){
    return {
      img : ""
  }
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        id: "",
        name: "",
        code: "",
        start: "",
        end: "",
        ClassId: "",
        Materials: [],
      }),
    },
  },

  methods: {
        formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('LLLL', "Asia/Jakarta");
        }
    }
};
</script>
<style scoped>
.modal-backdrop {
  z-index: -1;
}
</style>