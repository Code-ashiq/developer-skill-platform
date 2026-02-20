from django.contrib import admin
from .models import Question


class QuestionAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "difficulty",
        "topic",
        "created_at"
    )

    search_fields = (
        "title",
        "topic",
        "difficulty"
    )

    list_filter = (
        "difficulty",
        "topic"
    )


admin.site.register(Question, QuestionAdmin)