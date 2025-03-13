

<p align="center">All images also get the test-decoration class applied to them as it is specified in the config options of the plugin.</p>

# Source Paths

<div class="grid">
  <div class="block">
    <h4>With Space Local Folder</h4>

    ![With Space Local Folder](./img%20with%20space.png)

```md
![alt text](./img%20with%20space.png)
```
  </div>


  <div class="block">
    <h4>no space in path, local folder</h4>

    ![No space, local folder](./img.png)

```md
![alt text](./img.png)
```
  </div>

  <div class="block">
    <h4>No space in path, lib folder</h4>

    ![No space, lib folder](../lib/images/img.png)

```md
![alt text](../lib/images/img.png)
```
  </div>

</div>

# CSS Classes & Attributes

<div class="grid">

  <div class="block">
    <h4>CSS class in url parameters</h4>

![One css class in url params](./img.png?class=test-border&class=test-shadow)

```md
![alt text](./img.png?class=test-border&class=test-shadow)
```
  </div>



  <div class="block">
    <h4>CSS classes w/ rotation & lazy loading</h4>

![alt text](../lib/images/img.png?loading=lazy&class=test-border&class=test-outline;test-rotation-animation)

```md
![alt text](../lib/images/img.png?loading=lazy&class=test-border&class=test-outline;test-rotation-animation)
```
  </div>


</div>




# Image processing directives

<div class="grid">

  <div class="block">
    <h4>blur + flip & CSS classes</h4>

![alt text](../lib/images/img.png?blur=4&flip=true&class=test-outline;test-border)

```md
![alt text](../lib/images/img.png?blur=4&flip=true&class=test-outline;test-border)
```
  </div>



  <div class="block">
    <h4>CSS class with rotate & tint</h4>

![alt text](./vitejs-logo.png?rotate=25&tint=ff3355&class=test-shadow;vite-size)

```md
![alt text](./vitejs-logo.png?rotate=25&tint=ff3355&class=test-shadow;vite-size)
```
  </div>


</div>

<style>
  .test-decoration {
    background-image: radial-gradient(orange, yellow);
    border-radius: 100%;
    padding: 2em;
    margin: 2em;
  }

  .test-shadow {
    box-shadow: -1ex 2ex 2ex lightgray;
  }

  .vite-size{
    width: 128px;
    height: 128px;
  }

  .test-border {
    border: 2px solid red;
  }
  .test-outline {
    outline: 4px solid rebeccaPurple;
  }
  .test-rotation-animation {
    animation: rotation 2s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

