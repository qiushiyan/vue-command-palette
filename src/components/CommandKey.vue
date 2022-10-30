<template>
    <div class="command-key flex mr-4 gap-1">
        <div class=" shadow-sm rounded border-2 flex align-center p-[1px]">
            <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
    </div>
</template>