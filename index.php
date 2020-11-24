<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <meta name="theme-color" content="#e91429">

    <!-- Animate CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Bsale</title>
</head>
<body>
    <div class="container">
        <div class="bar-header">
            <img src="img/logo_bsale.png" alt="">
            <div>
                <i style="font-size:1.5em; color:#464646;" class="fas fa-user-circle"></i>
                <i style="font-size:1.5em; color:#464646;" class="fas fa-shopping-cart"></i>
            </div>
        </div>
        <div class="bar-options">
            <div>
                <span style="font-size:0.8em;">Categorias</span>    
                <select name="" id="ddl-categories">
                    <option value="0">Todas</option>
                </select>
            </div>
            <div>
                <input type="text" placeholder="Buscar" id="input_search">
                <button id="searchItems" type="button" class="btn-search"><i class="fas fa-search"></i></button>
            </div>
            <span class="count-products"></span>
        </div>
        <div class="body-products" id="products">
        </div>
    </div>
    <template id="template-product">
        <div class="item">
            <div class="body-discount"></div>
            <span class="category-title"></span>
            <img src="" alt="">
            <div class="detail-item">
                <span class="truncate" title="">Titulo</span>
                <hr>
                <del style="font-size:1em; color :#a5a5a5;"></del>
                <span><strong style="font-size:1.8em;"></strong></span>
            </div>
            <button type="button" class="btn-add" title="Agregar a Carrito"><i style="font-size:1.5em;" class="fas fa-shopping-basket"></i> </button>
        </div>
    </template>
    <script src="js/app.js"></script>
</body>
</html>