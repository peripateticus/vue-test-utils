<template>
    <div class="message-text" data-ui="message-text">
        <slot></slot>
        <button id="click-add" v-on:click="increment">Add 1</button>
        <p id='msg'>{{count}}</p>
    </div>
</template>

<script>
    export default {
        name: 'child-component',
        data: function () {
            return {
                name: 'child-component',
                count: 0
            };
        },
        methods: {
            increment: function () {
                this.count += 1;
            }
        }
    };
</script>