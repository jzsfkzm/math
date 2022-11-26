<template>
  <div class="hello">
    <h1>Szorzás</h1>
    <p>
      Számold ki az eredményt!
    </p>

    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import TaskList from './TaskList';

const generateTask = (level) => {
  let lower = 0;
  let upper = 10;

  if (level === 0) {
    upper = 5;
  }

  if (level === 1) {
    lower = 6;
  }

  if (level === 3) {
    upper = 20;
  }

  const a = (level < 4)
    ? Math.round(Math.random() * (upper - lower)) + lower
    : (Math.round(Math.random() * 10 * (upper - lower)) / 10) + lower;
  const b = Math.round(Math.random() * (upper - lower)) + lower;

  return {
    question: `${a} · ${b} = `,
    resultMetric: '',
  };
};

const generateTasksOfLevel = (count, level) => {
  return Array.from(Array(count)).map(() => generateTask(level));
}

const getTasks = () => {
  return []
    .concat(generateTasksOfLevel(100, 0))
    .concat(generateTasksOfLevel(100, 1))
    .concat(generateTasksOfLevel(300, 2))
    .concat(generateTasksOfLevel(250, 3))
    .concat(generateTasksOfLevel(250, 4));
};

export default {
  name: 'Multiplication',
  data: () => ({
    tasks: getTasks()
  }),
  components: {
    TaskList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 20px;
}
p {
  margin: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 40px;
  text-align: left;
}
span.index {
  margin-right: 50px;
}
a {
  color: #42b983;
}
</style>
