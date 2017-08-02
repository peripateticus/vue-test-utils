<template>
    <div id="parent-id">
        <div id="div1">div1</div>
        <div id="div2">{{item.x}}</div>
        <child-component>{{ item.y }}</child-component>
    </div>
</template>

<script>
    import ChildComponent from './child.vue';

    export default {
        name: 'parent',
        components: { ChildComponent },
        props: [ 'item' ]
    };
</script>