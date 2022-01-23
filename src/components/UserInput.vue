<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

const emit = defineEmits
([
    'usernameUpdated(event)'
]);
const props = defineProps
({
    placeholder: String
});

const handleUsernameChange = (event) => emit('usernameUpdated', event)
</script>

<template>
    
</template>

<style>
#app 
{
  
}
</style>