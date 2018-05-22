<template>
    <ul>
        <li id='a'></li>
        <li id='b'></li>
        <li id='c'></li>
        <li id='d'></li>
        <li id='e'></li>
        <li id='f'></li>
        <li id='g'></li>
        <li id='h'></li>
        <li id='i'></li>
    </ul>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped type="text/css">
    ul {
        position: absolute;
        left: 7%;
        top: 40%;
        transform: rotate(45deg) translate(-50%, -50%);
        cursor: pointer;
    }

    li {
        list-style-type: none;
        position: absolute;
        top: 0;
        left: 0;
        width: .5rem;
        height: .5rem;
        background: #2D8CF0;
        border-radius: 50%;
    }
    li:hover {
        background: #52D05C;
    }

    #a {
        animation: a 1.2s ease-in-out infinite;
        top: -.6rem;
        left: -.6rem;
    }

    #b {
        animation: b 1.2s ease-in-out infinite;
        top: -.6rem;
        left: 0;
    }

    #c {
        animation: c 1.2s ease-in-out infinite;
        top: -.6rem;
        left: .6rem;
    }

    #d {
        animation: d 1.2s ease-in-out infinite;
        top: 0;
        left: -.6rem;
    }

    #e {
        animation: e 1.2s ease-in-out infinite;
        top: 0;
        left: 0;
    }

    #f {
        animation: f 1.2s ease-in-out infinite;
        top: 0;
        left: .6rem;
    }

    #g {
        animation: g 1.2s ease-in-out infinite;
        top: .6rem;
        left: -.6rem;
    }

    #h {
        animation: h 1.2s ease-in-out infinite;
        top: .6rem;
        left: 0;
    }

    #i {
        animation: i 1.2s ease-in-out infinite;
        top: .6rem;
        left: .6rem;
    }

    @keyframes a {
        50% {
            top: 0;
            left: -.6rem;
        }
        100% {
            top: 0;
            left: -.6rem;
        }
    }
    @keyframes b {
        50% {
            top: -.6rem;
            left: -.6rem;
        }
        100% {
            top: -.6rem;
            left: -.6rem;
        }
    }
    @keyframes c {
        50% {
            top: -.6rem;
            left: 0;
        }
        100% {
            top: -.6rem;
            left: 0;
        }
    }
    @keyframes d {
        50% {
            top: .6rem;
            left: -.6rem;
        }
        100% {
            top: .6rem;
            left: -.6rem;
        }
    }
    @keyframes f {
        50% {
            top: -.6rem;
            left: .6rem;
        }
        100% {
            top: -.6rem;
            left: .6rem;
        }
    }
    @keyframes g {
        50% {
            top: .6rem;
            left: 0;
        }
        100% {
            top: .6rem;
            left: 0;
        }
    }
    @keyframes h {
        50% {
            top: .6rem;
            left: .6rem;
        }
        100% {
            top: .6rem;
            left: .6rem;
        }
    }
    @keyframes i {
        50% {
            top: 0;
            left: .6rem;
        }
        100% {
            top: 0;
            left: .6rem;
        }
    }
</style>