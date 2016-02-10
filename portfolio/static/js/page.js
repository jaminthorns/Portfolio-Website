$(document).ready(function() {
    $('body').addClass('js');

    var current = $('.section.current');
    var colors = eval(current.attr('colors'));

    document.title = current.attr('title');
    move_current(false);

    $('body').on('click', '.section', click_section);
    $('body').on('transitionend', '.content', change_section);
    $(window).on('popstate', pop);
    $(window).on('resize', function() { move_current(false); });

    triangles = new Triangles($('#background')[0], colors, 100, 2, 0.4, 10, 0.15, 25);
});

function click_section(event) {
    var target = $(event.currentTarget);
    var colors = eval(target.attr('colors'));

    if (!target.hasClass('current')) {
        triangles.morph(event.pageX, event.pageY, colors);
        start_change_section(target, true);
    }

    return false;
}

function pop(event) {
    var x, y, colors;

    var current = $('.section[href="' + window.location.pathname + '"]');
    x = current.offset().left + current.width() / 2;
    y = current.offset().top + current.height() / 2;
    colors = eval(current.attr('colors'));

    start_change_section(current, false);
    triangles.morph(x, y, colors);
}

function start_change_section(section, push) {
    var home = $('.section.current .logo-first').length > 0;

    // Hide content
    $('.content').addClass('hidden');
    // Change section title
    document.title = section.attr('title');
    // Change current section
    $('.section').removeClass('current');
    section.addClass('current');

    // Coming from Home
    if (home) {
        move_current(false);
        $('#current').removeClass('hidden'); }
    // Going to Home
    else if ($('.section.current .logo-first').length > 0)
        $('#current').addClass('hidden');
    // Go to somewhere else
    else
        move_current(true);

    // Push state
    if (push) window.history.pushState({}, document.title, section.attr('href'));
}

function change_section(event) {
    if ($('.content').hasClass('hidden'))
        $.ajax($('.section.current').attr('href')).done(load_new_page);
}

function move_current(animate) {
    var section = $('.section.current');
    var current = $('#current');
    var translate = section.offset().left - section.parent().offset().left;

    if (!animate) current.addClass('notransition');

    current.css('transform', 'translateX(' + translate + 'px)');

    if (!animate) {
        current[0].offsetHeight;
        current.removeClass('notransition');
    }
}

function load_new_page(page_html) {
    var page = $(page_html);
    var urls = {'SCRIPT': 'src', 'LINK': 'href'};

    // Get scripts and links that are not already in head
    var head = page.filter('script, link').filter(function (index, element) {
        var tag = element.tagName;
        var url = $(element).attr(urls[tag]);

        // Check if script or link already exists in head
        return $('head [' + urls[tag] +'="' + url + '"]').length == 0;
    });

    // Load new scripts and links
    $('head').append(head);
    // Load content
    $('.content').empty();
    $('.content').append(page.filter('.content').children());
    // Show content
    $('.content').removeClass('hidden');
}
