<template>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">
      <Task :index="index" :task="task" />
    </li>
  </ul>
</template>

<script>
import Task from './Task';

export default {
  name: 'TaskList',
  props: ['tasks'],
  components: {
    Task
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 40px;
  text-align: left;
  width: 300px;
  float: left;
}
span {
  margin-right: 50px;
}
</style>
