<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-5">
        <h1>Gestion des bons de reduction</h1>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style="width:1%">#</th>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col" style="width:10%">Reduction</th>
              <th scope="col" style="width:10%">Type</th>
              <th scope="col" style="width:10%">Activé</th>
              <th scope="col " style="width:10%">
                <button type="button" @click="display_form_add" class="btn btn-success"><i
                    class="fa-solid fa-plus"></i></button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup></script>