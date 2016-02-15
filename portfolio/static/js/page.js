$(document).ready(function() {
    $('body').on('click', '.section', click_section);
    $('body').on('transitionend', '.content', change_section);
    $(window).on('popstate', pop);

    var colors = eval($('.section.current').attr('colors'));

    triangles = new Triangles($('#background')[0], colors, 100, 2, 0.4, 10, 0.15, 25);
    reveal = {hidden: false, content: false};
    content = undefined;
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
    reveal = {hidden: $('.content').hasClass('hidden'), content: false};

    // Hide content
    $('.content').addClass('hidden');
    // Change section title
    document.title = section.attr('title');
    // Change current section
    $('.section').removeClass('current');
    section.addClass('current');

    // Load page
    $.ajax($('.section.current').attr('href')).done(load_new_page);

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
    if (event.originalEvent.propertyName == 'opacity' &&
        $('.content').hasClass('hidden')) {
        reveal.hidden = true;
        if (reveal.content) load_content();
    }
}

function move_current(animate) {
    var current = $('#current');
    var position = $('.current').index('.sections .section');

    if (!animate) current.addClass('notransition');

    current.attr('position', position);

    if (!animate) {
        current[0].offsetHeight;
        current.removeClass('notransition');
    }
}

function load_new_page(page_html) {
    var page = $(page_html);

    // Get scripts that are not already in head
    var head = page.filter('script').filter(function (index, element) {
        return $('head [src="' + $(element).attr('src') + '"]').length == 0; });

    // Load new scripts
    $('head').append(head);

    content = page.filter('.content').children();

    reveal.content = true;
    if (reveal.hidden) load_content();
}

function load_content() {
    // Load content
    $('.content').empty();
    $('.content').append(content);
    // Show content
    $('.content').removeClass('hidden');
}
