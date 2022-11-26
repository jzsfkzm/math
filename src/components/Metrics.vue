<template>
  <div class="hello">
    <h1>Mértékegység-átváltások</h1>
    <p>
      Add meg a hiányzó értékeket!
    </p>

    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import shuffle from 'lodash/fp/shuffle';
import initial from 'lodash/fp/initial';
import first from 'lodash/fp/first';
import drop from 'lodash/fp/drop';
import findIndex from 'lodash/fp/findIndex';

import TaskList from './TaskList';

const units = {
  length: [
    {
      name: 'km',
      ratio: 1000
    },
    {
      name: 'm',
      ratio: 1,
    },
    {
      name: 'dm',
      ratio: 0.1
    },
    {
      name: 'cm',
      ratio: 0.01
    },
    {
      name: 'mm',
      ratio: 0.001
    },
  ],
  volume: [
    {
      name: 'm³',
      ratio: 1000
    },
    {
      name: 'hl',
      ratio: 100
    },
    {
      name: 'l',
      ratio: 1,
    },
    {
      name: 'dm³',
      ratio: 1,
    },
    {
      name: 'dl',
      ratio: 0.1
    },
    {
      name: 'cl',
      ratio: 0.01
    },
    {
      name: 'ml',
      ratio: 0.001
    },
    {
      name: 'cm³',
      ratio: 0.001
    },
    {
      name: 'mm³',
      ratio: 0.000001
    },
  ],
  time: [
    {
      name: 'nap',
      ratio: 86400
    },
    {
      name: 'óra',
      ratio: 3600
    },
    {
      name: 'perc',
      ratio: 60,
    },
    {
      name: 'másodperc',
      ratio: 1
    },
  ],
  area: [
    {
      name: 'km²',
      ratio: 1000000
    },
    {
      name: 'm²',
      ratio: 1
    },
    {
      name: 'dm²',
      ratio: 0.01,
    },
    {
      name: 'cm²',
      ratio: 0.0001
    },
    {
      name: 'mm²',
      ratio: 0.000001
    },
  ]
};

const pickTopic = () => {
  return first(shuffle(Object.keys(units)));
}

const pickFromUnit = (topic) => {
  return first(shuffle(initial(units[topic])));
};

const pickToUnit = (level, topic, fromUnit) => {
  const index = findIndex((unit) => {
    return unit.name === fromUnit.name;
  }, units[topic]);

  if (level === 0) {
    const nextRatio = units[topic][index + 1].ratio;
    const itemsWithSameRatio = units[topic].filter((item) => {
      return item.ratio === nextRatio;
    });

    return first(shuffle(itemsWithSameRatio));
  }

  return first(shuffle(drop(index + 1, units[topic])));
};

const pickFromCount = (level, fromUnit, toUnit) => {
  if (level < 2) {
    return 1;
  }

  if (level === 2) {
    return Math.floor(Math.random() * 9) + 1;
  }

  if (level === 3) {
    return Math.floor(Math.random() * 99) + 1;
  }

  if (level === 4) {
    return Math.floor(Math.random() * 99) / 10;
  }

  let retval = Math.round((Math.floor(Math.random() * 99) + 1) * toUnit.ratio / fromUnit.ratio);
  while (retval > 1000000) {
    retval = retval / 10;
  }

  return retval;
};

const generateTask = (level) => {
  const topic = pickTopic();
  let fromUnit = pickFromUnit(topic);
  let toUnit = pickToUnit(level, topic, fromUnit);

  if (level > 1 && topic !== 'time') {
    [fromUnit, toUnit] = [toUnit, fromUnit];
  }

  const fromCount = pickFromCount(level, fromUnit, toUnit);

  return {
    question: `${fromCount} ${fromUnit.name} = `,
    resultMetric: toUnit.name,
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
  name: 'Metrics',
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
