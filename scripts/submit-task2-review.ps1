# Запуск:
#   gh auth login
#   .\scripts\submit-task2-review.ps1

$ErrorActionPreference = "Stop"
$repo = "djteoz/react-native-test-task"
$branch = "task-2-review-optimization-list"

git checkout -B $branch
git add docs/review-optimization-list.md scripts/submit-task2-review.ps1
git diff --staged --quiet
if ($LASTEXITCODE -ne 0) {
  git -c user.name="McCallister097" -c user.email="McCallister097@users.noreply.github.com" commit -m "docs: ревью OptimizationList (задание №2)"
}
git push -u origin $branch

$prBody = @"
## Summary
Ревью компонента ``OptimizationList`` без изменения его логики.

- Фокус: оптимизация и React Native best practices
- Полный текст: ``docs/review-optimization-list.md``
- Inline-комментарии добавлены к ``pages/review-list/review-list.tsx``

## Test plan
- [x] Прочитан ``pages/review-list/review-list.tsx``
- [x] Сверка с ``docs/recommendations.md``
- [x] Inline-комментарии опубликованы
"@

$prUrl = gh pr create --base main --head $branch --title "Review: OptimizationList (Задание №2)" --body $prBody
Write-Host "PR: $prUrl"

$commitSha = gh api "repos/$repo/commits/main" --jq ".sha"
Write-Host "Commit SHA: $commitSha"

$comments = @(
  @{ line = 17; body = "**ScrollView + map не масштабируется.** Для 100+ элементов нужен FlatList/FlashList. ScrollView монтирует все строки сразу." },
  @{ line = 18; body = "**Динамический первый элемент в data.** Каждый символ в TextInput перерисовывает все строки. Если элемент всегда первый — ListHeaderComponent." },
  @{ line = 30; body = "**TextInput + ScrollView.** Для больших списков input лучше в ListHeaderComponent FlatList." },
  @{ line = 36; body = "**Нет memoization.** Вынести row в React.memo, renderItem — useCallback." },
  @{ line = 38; body = "**Нестабильный key={item.title}.** Меняется при вводе value. Нужен стабильный id + keyExtractor." },
  @{ line = 39; body = "**Inline styles.** Вынести в review-list.style.ts (см. docs/recommendations.md)." },
  @{ line = 9;  body = "**Структура файлов.** Типы → .model.ts, стили → .style.ts по conventions проекта." },
  @{ line = 23; body = "**Порядок данных:** '6' перед '5' — вероятная опечатка." }
)

foreach ($c in $comments) {
  gh api "repos/$repo/commits/$commitSha/comments" `
    -f path="pages/review-list/review-list.tsx" `
    -F line=$c.line `
    -f body=$c.body | Out-Null
}

gh pr comment $prUrl --body @"
## Итог ревью

**Вердикт:** для 100+ элементов текущая реализация не подходит.

**Ответ на доп. вопрос:** если динамический элемент всегда первый — ``ListHeaderComponent``; если последний — ``ListFooterComponent``. Это изолирует изменения value от re-render статических строк.

Inline-комментарии: см. commit comments на ``review-list.tsx`` (commit ``$commitSha``).
"@

Write-Host "Done. Open PR: $prUrl"
