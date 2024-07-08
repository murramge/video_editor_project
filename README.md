# 비디오 에디터 프로젝트

# 전체 기능 목록

비디오 파일 업로드

비디오 재생

비디오 편집 (비디오 자르기)

GIF 변환 다운로드

비디오 다운로드

비디오 효과 및 필터 (밝기 조절, fade In, fade Out)

비디오 음악 넣기

비디오 속도 조절

# 프로젝트 설명

## 프로젝트 목표

평소에 진행하는 프로젝트보다 **“코드 리팩토링”** 에 관해 신경을 많이 쓰면서 작업했다. 데브코스를 진행하면서 배웠던 router-dom이나, redux를 사용하고, 비디오 에디터 라이브러리 사용이 익숙해지기 위해 ffmpeg의 다양한 기능을 추가하려고 노력했다. 

---

## 라이브러리 및 프레임워크 사용 이유

| 이름 | 사용 이유 |
| --- | --- |
| react-router-dom | edit의 페이지가 달랐으면 했고, 추후 비디오 작업목록 기능을 만들 예정이기에 메인 페이지에서는 edit페이지에서 작업했던 비디오들이 보일 수 있도록, id 처리화해서 진행 예정이기 때문에 페이징화 해 주었다. (추후 작업 예정) |
| redux, react-redux | 개발을 하다보면, 오로지 자식에게 넘겨주기 위해서 useState를 만들어주어서 setState를 자식이 props로 받고, 값을 입력하는데 이것은 코드가 길어지면 점점 헷갈린다고 생각하고 코드 가독성도 좋지 않다고 생각이 들었다. 또한 사용 빈도가 높은 곳은 자유자재로 모든 컴포넌트에서 데이터를 사용하고 싶었다. |
| tailwind CSS | 평소에도 tailwindCSS로 작업을 많이 했었고, 간단한 코드들은 tailwindCSS를 이용해서 작업했다. |
| ffmpeg | 다양한 비디오 에디터 라이브러리를 살펴보긴 했으나, 웹에서 비디오 에디터 라이브러리를 사용할 때 ffmpeg가 좀 더 효용성이 많고, mac 에서 개발하기 때문에 다른 라이브러리는 리눅스 기반이라서 비교하다가 ffmpeg 비디오 에디터 라이브러리를 사용하기로 결정하였다. |

## 폴더 구조

![IMG_1F95118799B2-1](https://github.com/murramge/video_editor_project/assets/60298173/4be28156-a213-450e-9ca6-1fd269781056)

# **Video Main**
![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-03-12_16 21 53](https://github.com/murramge/video_editor_project/assets/60298173/ae5207d7-0f34-4b2b-8422-4e484b730754)

**pages - VideoMain**

url을 / 로 설정해서 component main 폴더에 있는 videoUpload.jsx 컴포넌트를 불러와서 진행

**component - VideoPlayer**

비디오 파일을 redux dispatch를 이용하여 상태관리에 넣어서 /editor 페이지에서 불러올 수 있도록 진행. 파일이 있다면, useNavigate로 /editor로 넘어갈 수 있게 구현

# **Video Editor**

![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-03-12_16 22 33](https://github.com/murramge/video_editor_project/assets/60298173/3fd6dcbf-4df5-4fe5-9089-71a72a57c678)


**pages - VideoEditor**

url을 /edit로 설정하고 component editor 폴더에 있는 컴포넌트들을 불러와서 진행. 꼭 넘겨줘야 하는 props는 따로 컴포넌트에 넘겨주었음.

**component - VideoPlayer**

useEffect로 처음 마운트가 되었을 때, videofile이 없다면, 다시 홈화면으로 돌아갈 수 있도록 useNavigate(”/”)로 구현. videofile이 있다면 컴포넌트 안의 useState를 이용하여 URL.createObjectURL로 videofile의 URL 소스를 생성해줌.

video-react를 사용하여서 Player 컴포넌트를 가져오고, 불필요한 useState를 줄이기 위해 참조만 되는 것들은 ref를 사용하여 적용해줌.

**component - VideoExport**

redux안에 담긴 상태값을 가져온 후, common 파일에 있는 ffmpegExport 파일을 import 해서, 각각 video download, audio download, gif download 버튼을 클릭하면 ffmpegExport의 공통 함수를 이용해서 각각 버튼들에 맞게 다운로드가 될 수 있도록 만들어주었다.

# **VideoEditor - edit option**

![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-03-12_16 23 17](https://github.com/murramge/video_editor_project/assets/60298173/99457a1e-c97f-4aac-93a2-be5947f80dea)


**component - VideoCropBar**

비디오를 자를 수 있는 CropBar 생성해 줌. 플레이어와 연동이 되어서 시간이 움직여야 하기 때문에, video-player를 redux에서 가져온 후, player의 시간도 바꾸어 주도록 했음, 불필요한 useState는 함수로 바꿔서 정의했다.

**component - VideoBrightControl, VideoFadeInOutControl**

input type range를 통해 값을 이동할 수 있는 bar를 만들어주고, setState로 저장해서 ffmpeg에서 export할 때 사용할 수 있도록 redux에 담아주었다.

# trouble shoot 🎯

1. videoEditor에서 ffmpeg를 load 할 때, 이미 Load 되었다는 오류
   
    ![Untitled](https://github.com/murramge/video_editor_project/assets/60298173/5084aadf-54ed-4ece-b2ea-0af9d5067715)

    → 아예 최상단의 컴포넌트에서 한번만 load해 줌!
    
    기존에 VideoEditor에서 load 코드를 넣어서, 새로고침 시에 다시 파일을 넣으면 다시 로드시킬 수 없다는 error가 발생한 것!.. 그래서 최상단의 컴포넌트에서 딱 한 번만 Load를 해주면, 다시 로드되지 않게 됨
    
3. redux의 getState와 useSelect 의 차이점, 잘 몰라서 2개 다 사용하고 있었음 😅
    
    ```jsx
      let videoplayer = store.getState().videoplayer;
      videoplayer = useSelector((state) => state.videoplayer);
    ```
    
    - getState : 호출할 “당시”의 상태값만 불러올 수 있고, 자동적으로 변화하는 상태값을 추적하여 값을 업데이트 하지 않는다.
    - useSelect : 리액트의 “함수형 컴포넌트” 안에서만 사용할 수 있다. 그리고 함수를 전달하여, 필요한 상태값만 선택적으로 가져올 수 있다. getState와 달리, 자동적으로 변화하는 상태값을 추적하여 값을 업데이트 한다.
    
    → 프로젝트에서도 이 차이점을 파악해서, 계속 변화해야할 때 (조절하는 상태바 같은 것), 당시의 상태값만 불러올 수 있을 때를 구분지어서 사용해주었다
    
4. ffmpeg.run을 사용할 때 -vf 여러개 사용해서 여러 필터를 적용하려고 함
    
    ```jsx
       await ffmpeg.run(
          "-ss",
          `${minTime}`,
          "-i",
          "input.mp4",
          "-vf",
          `setpts=(1/${setptsvalue})*PTS`,
          "-vf",
          "eq=contrast=1.5:brightness=-0.1:saturation=1.3",
          "-vf",
          "fade=t=in:st=0:d=10,fade=t=out:st=10:d=5",
          "-t",
          `${maxTime}`,
          "-c:a",
          "copy",
          "output.mp4"
        );
    ```
    
    FFmpeg 커맨드 작성 시 주의해야 할 점을 잘 작성해주신 velog 글을 보며, 여러필터를 적용할 때의 주의사항 및, FFmpeg 명령어를 잘 사용하는 방법에 대해서 학습함. 
    
    [FFmpeg 커맨드, 이해하며 쓰자](https://velog.io/@yukimiau/FFmpeg-커맨드-작성시-기억해야할-주의사항들)
    
    → 
    
    ```jsx
    "-vf",
    "drawbox...,drawtext...",
    ```
    
    이런 느낌처럼, 여러 효과를 적용하고 싶을 때에는 -vf “…,…” 로 콤마로 분리해 나열해주면 여러 효과를 적용할 수 있음
