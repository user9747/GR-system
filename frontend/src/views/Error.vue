<template>
        <div class="md-layout md-alignment-center-center error">
            <div class="md-layout-item ">
                <span class="neg">ERROR 404</span>
                <p>
                    The page is missing or never was written. You can wait and<br />
                    see if it becomes available again, or you can restart your computer.	
                </p>
                Press any of the links to continue
                <br />
                <div>
                    <a class="error-link" href="/">index</a> | 
                    <a class="error-link" href="/login">login</a>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'error'
}
</script>

<style>
    .error{
        background:#0000aa;
        color:#ffffff;
        font-family:courier;
        font-size:12pt;
        height: inherit;

    }
    .neg{
        background:#fff;
        color:#0000aa;
        font-weight:bold;
    }
    .error-link, .error-link:hover{
        color:#ffffff !important; 
        font-family:courier;
        font-size:12pt;
        text-decoration: none;
    }
    #app{
        height: 100vh;
    }
</style>
