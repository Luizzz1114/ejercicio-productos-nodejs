<template>
  <button type="button" @click="$emit('click')" class="flex items-center justify-center gap-2 px-3 bg-indigo-400 text-white duration-200 text-sm rounded-lg cursor-pointer h-9 hover:opacity-50 active:scale-95">
    <i class="fi-sr-cross-small text-md grid place-content-center rotate-45"></i>
    <span>Registrar</span>
  </button>
</template>