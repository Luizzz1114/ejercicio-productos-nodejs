<template>
  <div class="flex items-center justify-start gap-2">

    <div v-if="columna.field === 'nombre'" class="flex flex-col justify-center max-w-[250px] lg:max-w-[310px]">
      <span>{{ item.nombre }}</span>
      <span class="overflow-hidden text-xs text-slate-400 text-ellipsis whitespace-nowrap">{{ item.descripcion ? item.descripcion : '' }}</span>
    </div>

    <span v-else-if="columna.field === 'precio'">${{ item.precio }}</span>

    <span v-else-if="columna.field === 'stock'">{{ item.stock }} U.</span>

    <div v-else-if="columna.field === 'categoria' || columna.field === 'color'" class="flex items-center justify-start gap-3 text-sm">
      <i :class="[iconos[item.icono], colores[item.color], 'rounded-md p-1 grid place-items-center']"></i>
      <span>{{ item.categoria || item.color }}</span>
    </div>

    <i v-else-if="columna.field === 'icono'" :class="[iconos[item.icono], 'grid place-items-center text-lg text-slate-500']"></i>

    <div v-else-if="columna.field === 'rol'" class="flex items-center justify-start gap-3 text-sm">
      <i :class="[roles[item.rol], 'rounded-md p-1 grid place-items-center']"></i>
      <span>{{ item.rol }}</span>
    </div>

    <div v-else-if="columna.field === 'creado'" class="flex flex-col">
      <div class="flex items-center gap-2">
        <i class="grid fi-rr-calendar place-items-center text-slate-500"></i>
        <span>{{ item.creado_fecha }}</span>
      </div>
      <div class="flex items-center gap-2 text-slate-400">
        <i class="grid fi-rr-watch place-items-center"></i>
        <span>{{ item.creado_hora }}</span>
      </div>
    </div>

    <div v-else-if="columna.field === 'actualizado'" class="flex flex-col">
      <div class="flex items-center gap-2">
        <i class="grid fi-rr-calendar place-items-center text-slate-500"></i>
        <span>{{ item.actualizado_fecha ? item.actualizado_fecha : '--/--/----' }}</span>
      </div>
      <div class="flex items-center gap-2 text-slate-400">
        <i class="grid fi-rr-watch place-items-center"></i>
        <span>{{ item.actualizado_hora ? item.actualizado_hora : '--:--:--' }}</span>
      </div>
    </div>

    <span v-else>{{ item[columna.field] }}</span>
    
  </div>
</template>

<script setup>
defineProps({
  columna: Object,
  item: Object
});

const iconos = {
  Celular: 'fi-rr-mobile-notch',
  Computador: 'fi-rr-computer',
  Herramienta: 'fi-rr-tools',
  Juegos: 'fi-rr-gamepad',
  Mouse: 'fi-rr-computer-mouse',
  Paleta: 'fi-rr-palette'
};

const colores = {
  Verde: 'bg-emerald-100 text-emerald-500',
  'Azul Cielo': 'bg-sky-100 text-sky-500',
  Azul: 'bg-blue-100 text-blue-500',
  Índigo: 'bg-indigo-100 text-indigo-500',
  Morado: 'bg-violet-100 text-violet-500',
  Rojo: 'bg-rose-100 text-rose-500'
};

const roles = {
  Administrador: 'fi-sr-admin-alt bg-indigo-100 text-indigo-600',
  Usuario: 'fi-sr-user bg-sky-100 text-sky-600',
}
</script>