<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../../css/normalize.css">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <table>
        <? foreach (file("apps.txt") as $apps) { ?>
            <tr>
                <? if ($apps != 0) {
                    $apps = explode("-*-", $apps);
                    foreach ($apps as $col) { ?>
                        <td><?= $col; ?></td>
                <?  }
                } ?>
            </tr>
        <? } ?>

    </table>

    <form id="file" method="POST" enctype="multipart/form-data" >
        <input type="file" name="pictures[]" multiple="multiple">
        <input type="submit">
    </form>
    <script src="main.js" type="module"></script><!-- type="module" требуеться для использования import export-->
</body>

</html>