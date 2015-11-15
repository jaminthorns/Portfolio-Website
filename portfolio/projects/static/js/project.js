$(document).ready(function() {
    // Set event handlers
    $('.projects .project').on('click', open_project_detail);
    $('.project-detail-container').on('click transitionend', close_project_detail);
});

function open_project_detail() {
    var project_id = $(this).attr('project-id');
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

    if (event.type == 'click' && target.hasClass('project-detail-container')) {
        target.css('opacity', '0');
        target.css('pointer-events', 'none');
    }
    else if (event.type == 'transitionend' && target.css('opacity') == 0) {
        target.removeAttr('style');
        target.removeClass('active');
        target.empty();
    }
}
