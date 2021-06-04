package com.boot.spring.springboot.web;

import com.boot.spring.springboot.config.auth.LoginUser;
import com.boot.spring.springboot.config.auth.dto.SessionUser;
import com.boot.spring.springboot.service.posts.PostsService;
import com.boot.spring.springboot.web.dto.PageDto;
import com.boot.spring.springboot.web.dto.PostsListResponseDto;
import com.boot.spring.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.Session;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model , @LoginUser SessionUser user) {

        List<PostsListResponseDto> allDesc = postsService.findAllDesc();
        model.addAttribute("posts", allDesc);

        if (user != null) {
            model.addAttribute("myName", user.getName());
        }

        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave() {
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id , Model model) {

        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);

        return "posts-update";
    }

    @GetMapping("/posts/test")
    @ResponseBody
    public Map<String,Object> test(Model model , @LoginUser SessionUser user) {

        Map<String, Object> map = new HashMap<>();

        List<PostsListResponseDto> allDesc = postsService.findAllDesc();

        map.put("list", allDesc);
        map.put("user", user);

        return map;
    }
}
