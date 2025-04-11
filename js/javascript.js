$(document).ready(function () {
    $('.hamburger-menu').on('click', function () {
        $('body').toggleClass('menu-open');
    });

    $('.danmaku-toggle').on('mouseenter', function () {
        $('body').addClass('danmaku-open');
    });

    $('.danmaku-toggle').on('mouseleave', function () {
        $('body').removeClass('danmaku-open');
    });

    $(window).on('scroll', function () {
        const projectTop = $('.project-body').offset().top;
        const scrollTop = $(window).scrollTop();

        if (scrollTop >= projectTop) {
            $('body').addClass('sticky-table');
        } else {
            $('body').removeClass('sticky-table');
        }
    });

    $('.table-of-contents .hyperlink').on('click', function () {
        const $li = $(this).parent();
        const $ul = $li.parent();

        const liOffset = $li.offset().left;
        const ulOffset = $ul.offset().left;
        const liWidth = $li.outerWidth();
        const ulWidth = $ul.outerWidth();

        const currentScroll = $ul.scrollLeft();
        const offsetToCenter = (liOffset - ulOffset) - (ulWidth / 2) + (liWidth / 2);

        $ul.animate({ scrollLeft: currentScroll + offsetToCenter }, 300);
    });

    const skills = [
        "UI/UX Design",
        "UXデザイン",
        "Iterative Design",
        "Prototyping & Wireframing",
        "プロトタイピング",
        "ワイヤーフレーム作成",
        "User Flows",
        "Usability Testing",
        "ユーザビリティテスト",
        "User Interviews",
        "ユーザーインタビュー",
        "Affinity Mapping",
        "親和図",
        "Figma",
        "Adobe Illustrator",
        "HTML",
        "CSS",
        "JavaScript",
        "Game Development",
        "ゲーム開発",
        "Game Design",
        "ゲームデザイン",
        "Unity3D",
        "C#",
        "Blender",
        "CAD Drawing",
        "CAD図面作成",
        "Digital Art", "イラスト",
        "Video Editing",
        "動画編集",
        "Building PCs",
        "自作PC",
        "Assembling Keyboards",
        "キーボード組み立て"
    ];

    const activeComments = new Set();

    function spawnComment() {
        const container = document.getElementById('danmaku-container');

        const availableSkills = skills.filter(skill => !activeComments.has(skill));
        if (availableSkills.length === 0) return;

        const skill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        activeComments.add(skill);

        const comment = document.createElement('div');
        comment.className = 'danmaku';
        comment.textContent = skill;

        const top = Math.random() * 90;
        const duration = Math.random() * 10 + 10;

        comment.style.top = `${top}%`;
        comment.style.fontSize = `${Math.random() * 1 + 2}em`;
        comment.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
        comment.style.fontWeight = 'bold';
        comment.style.textShadow = `
          -1px -1px 0 black,
           1px -1px 0 black,
          -1px  1px 0 black,
           1px  1px 0 black
        `;
        comment.style.animationDuration = `${duration}s`;

        container.appendChild(comment);

        setTimeout(() => {
            comment.remove();
            activeComments.delete(skill);
        }, duration * 1000);
    }

    setInterval(spawnComment, 700);
});