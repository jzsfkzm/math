<template>
  <div class="hello">
    <h1>Törtek</h1>
    <p>
      Számold ki az eredményt!
    </p>

    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import shuffle from 'lodash/fp/shuffle';
// import initial from 'lodash/fp/initial';
import first from 'lodash/fp/first';
// import drop from 'lodash/fp/drop';
// import findIndex from 'lodash/fp/findIndex';

import TaskList from './TaskList';

const getFraction = (numerator, denominator) => {
  return `<span class="fraction"><span class="numerator">${numerator}</span><span class="denominator">${denominator}</span></span>`;
};

const getPart = (level, part) => {
  if (level === 0 && part === 0) {
    return Math.floor(Math.random() * 10) + 1;
  }

  const numerator = Math.floor(Math.random() * (level + 1) * 3) + 1;
  const denominator = Math.floor(Math.random() * (level + 1) * 3) + 1;

  return getFraction(numerator, denominator);
};

const operations = ['+', '−', '·', '÷'];

const generateTask = (level) => {
  const operation = first(shuffle(operations));
  let partA = getPart(level, 0);
  let partB = getPart(level, 1);

  if (Math.random() > 0.5) {
    [partB, partA] = [partA, partB];
  }

  return {
    question: `${partA} ${operation} ${partB} = `,
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
    .concat(generateTasksOfLevel(100, 2))
    .concat(generateTasksOfLevel(100, 3))
    .concat(generateTasksOfLevel(100, 4));
};

export default {
  name: 'Fractions',
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
</style>
