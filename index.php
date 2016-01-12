<!DOCTYPE html>
<html ng-app="ragamApp">

<head>
  <!-- Stylesheets -->
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/font-awesome.css" />

</head>

<body ng-controller="mainController">

  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">Angular Routing Example</a>
      </div>

      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><i class="fa fa-home"></i> Home</a></li>
        <li><a href="#about"><i class="fa fa-shield"></i> About</a></li>
        <li><a href="#contact"><i class="fa fa-comment"></i> Contact</a></li>
      </ul>
    </div>
  </nav>

  <div id="main">
  
    <div ng-view></div>
    
  </div>
  
  
  <!-- Scripts -->
  <script src="assets/js/angular.min.js"></script>
  <script src="assets/js/angular-route.js"></script>
  <script src="assets/js/script.js"></script>

</body>

</html>
