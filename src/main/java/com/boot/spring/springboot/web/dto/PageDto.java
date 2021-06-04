package com.boot.spring.springboot.web.dto;

import lombok.Getter;

@Getter
public class PageDto {
    private int startPage;
    private int endPage;
    private boolean prev;
    private boolean next;
    private int total;
    private int amount = 10;   // 하단에 표시될 페이지 수
    private int pageNum = 1;   // 첫페이지.

    public PageDto(int total) {
        this.total = total;

        int totalPage = total / amount;
        if (totalPage % total > 0) totalPage++;
        if (totalPage < pageNum) pageNum = totalPage;

        //시작페이지 구하기
        this.startPage = ((pageNum - 1) / amount) * amount + 1;
        //끝페이지 구하기
        this.endPage = this.startPage - amount - 1;
        if (this.endPage > totalPage) this.endPage = totalPage;

        this.prev = this.startPage > 1;
        this.next = this.endPage < totalPage;
    }
}
