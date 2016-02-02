$(document).ready(function() {
    $('body').on('click', '.projects .project', open_project_detail);
    $('body').on('click transitionend', '.project-detail-container', close_project_detail);
    $(document).on('keyup', close_project_detail);
});

function open_project_detail(event) {
    var project_id = $(event.currentTarget).attr('project-id');
    var container = $('.project-detail-container');

    $.ajax('/projects/project_detail/' + project_id)
     .done(function(project_detail) {
        var project_detail = $(project_detail).appendTo(container);
        setup_project_detail(project_detail);
        container.addClass('active');
    });
}

function close_project_detail(event) {
    var target = $(event.target);
    var container = $('.project-detail-container');

    if (container.css('opacity') == 1 &&
        ((event.type == 'click' && target.is('.project-detail-container, .close, .close *')) ||
         (event.type == 'keyup' && event.which == 27))) {
        container.css('opacity', '0');
        container.css('pointer-events', 'none');
    }
    else if (event.type == 'transitionend' && container.css('opacity') == 0) {
        container.removeAttr('style');
        container.removeClass('active');
        container.empty();
    }
}
