<script>
  import PageTitle from '$lib/components/common/PageTitle.svelte';
  import { Accordion, AccordionItem } from '$lib/components/common/accordion';

  const items = [
    {
      title: '管理者頁面',
      content: [
        { name: '檢視所有使用者', isDone: true },
        { name: '權限管理user不能使用', isDone: true },
        { name: '重製使用者密碼', isDone: true },
        { name: '新增刪除使用者', isDone: true },
        { name: '修改使用者權限', isDone: true }
      ]
    },
    { title: 'Line bot整合', content: [] },
    {
      title: '主畫面',
      content: [
        { name: '網站Banner', isDone: true },
        { name: '顯示公司夥伴', isDone: true },
        { name: '個人圖片彈出簡介', isDone: false }
      ]
    },
    {
      title: '使用者設定',
      content: [
        { name: '密碼變更彈窗', isDone: true },
        { name: '密碼變更功能', isDone: true }
      ]
    }
  ];
</script>

<svelte:head>
  <title>專案進度</title>
</svelte:head>

<PageTitle>預計項目</PageTitle>

<div class="mx-auto w-1/3 max-w-1/2">
  <Accordion>
    {#each items as item, idx (idx)}
      <AccordionItem>
        <svelte:fragment slot="title">{item.title}</svelte:fragment>
        <ul slot="content">
          {#each item.content as contentItem, idx (idx)}
            <li class="list-disc {contentItem.isDone && 'line-through'}">
              {contentItem.name}
            </li>
          {/each}
        </ul>
      </AccordionItem>
    {/each}
  </Accordion>
</div>
