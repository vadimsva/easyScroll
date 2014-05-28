easyScroll
==========

jquery plugin for customize scrolbars

<h4>Easy. Fast. Customizable</h4>

<i>For work required only jQuery, other libraries are not required.</i>
<br>

<a href="http://vadimsva.github.io/easyScroll/" target="_blank"><b>DEMO</b></a>


<h4>Direct links to libs</h4>
<a href="http://vadimsva.github.io/easyScroll/easyScroll.js" target="_blank"><b>easyScroll.js</b></a> [23.3Kb]<br>
<a href="http://vadimsva.github.io/easyScroll/easyScroll.min.js" target="_blank"><b>easyScroll.min.js</b></a> [12.2Kb]<br>
<a href="http://vadimsva.github.io/easyScroll/easyScroll.css" target="_blank"><b>easyScroll.css</b></a> [3.7Kb]<br>
<a href="http://vadimsva.github.io/easyScroll/easyScroll.min.css" target="_blank"><b>easyScroll.min.css</b></a> [3.4Kb]


Documentation
=============

<p><i>$(el).easyScroll({param1 : value1, param2 : value2, ...});</i></p>

<h5>Parameters</h5>
<code>theme</code> - use theme for customize (string).<br>
Use: <code>'default'</code><br>
<br>
<code>scrollAutoHide</code> - show/hide scrollbars when elem has focus (boolean).<br>
Use: <code>false</code> - default, <code>true</code><br>
<br>
<code>scrolloffset</code> - offset for scrollbar (integer).<br>
Use: <code>1</code> - default<br>
<br>
<code>scrollMinHeight</code> - minimum height for scrollbar slider (integer).<br>
Use: <code>20</code> - default<br>
<br>
<code>scrollStep</code> - scroll step (integer).<br>
Use: <code>120</code> - default<br>
<br>
<code>scrollButtons</code> - show/hide scroll buttons (boolean).<br>
Use: <code>false</code> - default, <code>true</code><br>
<br>
<code>scrollHorizontal</code> - show horizontal scrollbar (boolean).<br>
Use: <code>false</code> - default, <code>true</code><br>
<br>



Examples
========

<pre>
$(el).easyScroll({
  theme : 'dafault',
  scrollAutoHide : false,
  scrollOffset : 1,
  scrollMinHeight : 20,
  scrollStep : 120,
  scrollButtons : false,
  scrollHorizontal : false
});
</pre>


License
=======

The MIT License (MIT)
