<template>
  <div class="card">
    <div class="card-body">
      <div class="row" style="height:80vh">
        <div class="col-md-4 border-right border-black-50 overflow-auto">
          <slot name="left"></slot>
        </div>
        <div class="col-md-8">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>