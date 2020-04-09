<template>
  <div id="app">
    <p>MrBEAM v 0.2.0</p>
    <div class="center first">Дезигнед</div>
    <ul>
      <li>Карусель</li>
      <li>Настройки темы и языка</li>
      <li>Кеширование</li>
      <li>Набор данных</li>
      <li>Таблица для данных</li>
      <li>Вывод графиков и таблиц</li>
      <li>Визуальное построение</li>
      <li>Инструкция</li>
    </ul>
  </div>
</template>

<style lang="sass">
p
  font-size: 2em
  text-transform: uppercase
  text-decoration: underline overline
  letter-spacing: 0.1em
  text-shadow:  1px 1px 3px blue, 2px 2px 3px red, 3px 3px 3px orange
  text-align: center
  margin-top: 200px

.center
  text-align: center
  font-weight: 700

.first::first-letter
  color: red
  background: blue
  font-size: 3em

li
  list-style-type: square

li:nth-of-type(2n)
  list-style-type: circle

</style>
