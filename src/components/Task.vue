<template>
  <div>
    <span class="index">{{ index + 1 }}.</span>
    <span class="question" v-html="task.question" />
    <span class="dotted"></span>
    <span class="resultMetric">{{ task.resultMetric }}</span>
  </div>
</template>

<script>

export default {
  name: 'Task',
  props: ['index', 'task']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
}
span.index {
  margin-right: 30px;
  align-items: center;
  display: flex;
}
span.question {
  display: flex;
  align-items: center;
}
span.question >>> span.fraction {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  text-align: center;
}
span.question >>> span.numerator {
  border-bottom: 1px solid black;
}
span.dotted {
  margin: 0 10px;
  border-bottom: 1px dotted #aaa;
  flex-grow: 1;
}
</style>
