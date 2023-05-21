<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    uploadAvatar: {
      form: FormData;
    };
  }>();

  let previewImg: HTMLElement;
  let preview = false;

  function changeHandler(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    if (inputEl.files) {
      const file = inputEl.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        preview = true;
        previewImg.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function submintHandler(e: SubmitEvent) {
    preview = false;
    if (e.target) {
      const formData = new FormData(e.target as HTMLFormElement);
      dispatch('uploadAvatar', {
        form: formData
      });
    }
  }
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <form class="flex flex-col items-center gap-4" on:submit|preventDefault={submintHandler}>
      <input
        type="file"
        class="file-input file-input-bordered file-input-sm w-full max-w-xs"
        accept="image/*"
        name="avatar"
        on:change={changeHandler}
      />
      <div class="avatar placeholder {preview || 'hidden'}">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-56">
          <img bind:this={previewImg} src="" alt="preview-avatar" />
        </div>
      </div>
      <button class="btn btn-sm w-full" disabled={!preview}>上傳</button>
    </form>
  </div>
</div>
