function setupSocket() {
    try {
        socket = io(url + ":3000", {
                reconnectionDelayMax: 2e4,
                timeout: 2e4
            }),
            handleSocket()
    } catch (e) {}
}

function handleSocket() {}

function sendAjax(e, t, n) {
    var i = new XMLHttpRequest;
    return i.open(e, t),
        i.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        i.setRequestHeader("Content-Type", "application/json"),
        "GET" != e && i.setRequestHeader("X-CSRF-TOKEN", _GLOBAL._TOKEN),
        i.withCredentials = !0,
        n ? i.send(JSON.stringify(n)) : i.send(),
        i
}

function getElement(e) {
    return document.querySelector(e)
}

function getAllElements(e) {
    return document.querySelectorAll(e)
}

function createElement(e, t, n, i, r) {
    var o = document.createElement(t);
    if (o.className = n,
        o.identity = e,
        i || (i = {}),
        r)
        for (var a = 0; a < r.length; a++)
            o.setAttribute(r[a].identity, r[a].value);
    if (i.innerHTML && (o.innerHTML = i.innerHTML),
        i.childrens)
        for (var a = 0; a < i.childrens.length; a++) {
            var s = createElement(i.childrens[a].identity, i.childrens[a].tag, i.childrens[a].className, i.childrens[a].options, i.childrens[a].properties);
            o.appendChild(s),
                o[i.childrens[a].identity] = s
        }
    return o
}

function createElementByJs(e, t, n, i, r) {
    var o = document.createElement(t);
    if (o.className = n,
        o.identity = e,
        i || (i = {}),
        r)
        for (var a = 0; a < r.length; a++)
            o.setAttribute(r[a].identity, r[a].value);
    if (i.innerHTML && (o.innerHTML = i.innerHTML),
        i.childrens)
        for (var a = 0; a < i.childrens.length; a++) {
            var s = createElementByJs(i.childrens[a].identity, i.childrens[a].tag, i.childrens[a].className, i.childrens[a].options, i.childrens[a].properties);
            o.appendChild(s),
                o[i.childrens[a].identity] = s
        }
    return o
}

function removeElement(e) {
    try {
        e.parentNode.removeChild(e)
    } catch (e) {}
}

function showLoginForm() {
    alertify.confirm("Chức năng này chỉ dành cho thành viên đã đăng nhập", function() {
        try {
            activeNavbarRight()
        } catch (e) {}
    })
}

function formatTime(e) {
    return e.substr(11, 8) + " " + e.substr(8, 2) + "/" + e.substr(5, 2) + "/" + e.substr(2, 2)
}

function getTimeAgo(e) {
    var t = e.substring(0, 10);
    if (ismobile.apple.device) {
        e = e.substring(0, 19).replace("T", " ");
        var n = e.split(/[- :]/);
        e = new Date(n[0], n[1] - 1, n[2], n[3], n[4], n[5]),
            e = new Date(e).getTime()
    } else
        e = new Date(e).getTime();
    var i = (new Date).getTime(),
        r = (i - e) / 1e3;
    return r > 2592e3 ? (t = t.split("-"),
        t[2] + "-" + t[1] + "-" + t[0]) : r > 604800 ? Math.floor(r / 604800) + " tuần trước" : r > 86400 ? Math.floor(r / 86400) + " ngày trước" : r > 3600 ? Math.floor(r / 3600) + " giờ trước" : r > 60 ? Math.floor(r / 60) + " phút trước" : Math.floor(r) + " giây trước"
}

function getPageYOffset() {
    try {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    } catch (e) {
        return 0
    }
}

function getScrollPageType() {
    try {
        return document.body.scrollTop > 0 ? 1 : 2
    } catch (e) {}
    return 0
}

function scrollTo(e, t, n) {
    if (!(n <= 0)) {
        var i = t - e.scrollTop,
            r = i / n * 10;
        setTimeout(function() {
            e.scrollTop = e.scrollTop + r,
                e.scrollTop != t && scrollTo(e, t, n - 10)
        }, 10)
    }
}

function scrollPageTo(e, t) {
    try {
        return void(document.body.scrollTop > 0 ? scrollTo(document.body, e, t) : scrollTo(document.documentElement, e, t))
    } catch (e) {}
    window.scrollTo(0, e)
}

function paginate(e, t, n, i) {
    var r = Math.ceil(e / n);
    t < 1 ? t = 1 : t > r && (t = r);
    var o, a;
    if (r <= i)
        o = 1,
        a = r;
    else {
        var s = Math.floor(i / 2),
            c = Math.ceil(i / 2) - 1;
        t <= s ? (o = 1,
            a = i) : t + c >= r ? (o = r - i + 1,
            a = r) : (o = t - s,
            a = t + c)
    }
    return {
        totalItems: e,
        currentPage: t,
        pageSize: n,
        totalPages: r,
        startPage: o,
        endPage: a
    }
}

function getRandom(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}

function encodeString(e, t) {
    var n = "";
    e.toString();
    for (var i = 0; i < e.length; i++) {
        var r = e.charCodeAt(i),
            o = r ^ t;
        n += String.fromCharCode(o)
    }
    return n
}

function getChatLength(e) {
    try {
        return document.querySelectorAll(e).length
    } catch (e) {}
}

function getChatMessages(e, t) {
    e || (e = 0);
    var n = sendAjax("GET", _GLOBAL._API + "/users/chat/messages?offset=" + e);
    n.onload = function() {
        if (t.more.classList.remove("hidden"),
            200 == n.status) {
            var e = JSON.parse(n.responseText);
            if (!e.data.length)
                return void t.more.classList.add("hidden");
            for (var i = 0; i < e.data.length; i++)
                t.list.appendChild(setChatItem(e.data[i], t))
        }
    }
}

function sendChat(e, t, n) {
    if (!lockAPI.chat) {
        if (_GLOBAL._USER_GOLD < 7 || _GLOBAL._USER_RESPECT < 70)
            return void alertify.error("Bạn chưa đăng nhập đủ 7 ngày nên không thể chat<br>Cần phải có nhiều hơn 7 vàng và 70 danh vọng mới được chat");
        lockAPI.chat = !0;
        var i = {
                content: e,
                mentioned_id: replyData.mentioned_id
            },
            r = sendAjax("POST", _GLOBAL._API + "/users/chat", i);
        r.onload = function() {
                try {
                    t.value = "",
                        n && n.click()
                } catch (e) {}
                lockAPI.chat = !1
            },
            r.onerror = function() {
                lockAPI.chat = !1,
                    alertify.error("Không kết nối được tới server chat")
            }
    }
}

function uploadChatImage(e) {
    var t = new FormData;
    t.append("image", e);
    var n = new XMLHttpRequest;
    n.open("POST", _GLOBAL._API + "/users/chat/image"),
        n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        n.setRequestHeader("X-CSRF-TOKEN", _GLOBAL._TOKEN),
        n.withCredentials = !0,
        n.send(t),
        n.onload = function() {
            if (200 == n.status) {
                JSON.parse(n.responseText)
            } else
                alertify.error("Upload hình không thành công!")
        },
        n.onerror = function() {
            alertify.error("Upload hình không thành công!")
        }
}

function setNoticeItem(e, t) {
    t || (t = {});
    var n = "vài giây trước",
        i = "/assets/img/avatar.png",
        r = "javascript:void(0);";
    e.created_at && (n = getTimeAgo(e.created_at)),
        e.thumbnail && (i = e.thumbnail),
        e.link && (r = e.link + '" target="_blank');
    var o = getElement(".notification-fixed"),
        a = document.createElement("div");
    a.className = "notification-fixed-item",
        a.innerHTML = '<a href="' + r + '"><div class="notification-fixed-item-thumbnail"><img src="' + i + '"></div><div class="notification-fixed-item-body"><div class="notification-fixed-item-title">' + e.content + '</div><div class="notification-fixed-item-time"><i class="icon icon-time"></i>' + n + "</div></div>",
        a.setAttribute("data-id", e.id);
    var s = document.createElement("div");
    s.className = "notification-fixed-item-close",
        s.innerHTML = '<i class="icon-close"></i>',
        s.onclick = function() {
            o.removeChild(a)
        },
        a.appendChild(s),
        o.appendChild(a),
        e.always || setTimeout(function() {
            try {
                o.removeChild(a)
            } catch (e) {}
        }, 1e4)
}

function setChatItem(e, t) {
    var n = document.createElement("div"),
        i = document.createElement("div"),
        r = document.createElement("div"),
        o = document.createElement("div"),
        a = document.createElement("div"),
        s = document.createElement("div"),
        c = document.createElement("span"),
        l = document.createElement("span"),
        u = t.input,
        d = t.mention,
        h = t.mentionText;
    n.setAttribute("data-id", e.id),
        i.className = "chat-avatar",
        i.innerHTML = '<a href="/user/' + e.author.id + '" target="_blank"><img src="' + e.author.avatar + '"></a>',
        o.className = "chat-name",
        o.innerHTML = e.author.full_name,
        n.className = "chat-item",
        a.className = "chat-content",
        r.className = "chat-item-body";
    var f = e.content;
    if (e.author.is_banned && (f = 'Nội dung đã ẩn vì tài khoản bị cấm do "' + e.author.banned_reason + '"',
            n.classList.add("banned")),
        e.mentioned_user ? a.innerHTML = '<span class="chat-content-mention">@' + e.mentioned_user.full_name + "</span>" + f : a.innerHTML = f,
        n.appendChild(i),
        n.appendChild(r),
        s.className = "chat-action",
        c.className = "chat-reply",
        l.className = "chat-time",
        c.innerHTML = '<i class="icon icon-comment"></i> trả lời',
        l.innerHTML = '<i class="icon icon-time"></i> ' + formatTime(e.created_at),
        s.appendChild(c),
        s.appendChild(l),
        r.appendChild(o),
        e.author.role.id < 10 && 8 != e.author.role.id) {
        var p = document.createElement("span");
        p.className = "chat-label",
            p.style.color = e.author.role.color,
            e.author.label ? p.innerHTML = e.author.label : p.innerHTML = e.author.role.name,
            r.appendChild(p)
    }
    return r.appendChild(s),
        r.appendChild(a),
        c.onclick = function() {
            return _GLOBAL._IS_LOGGED_IN ? e.author.is_banned ? (alertify.logPosition("top right"),
                void alertify.error("Không thể trả lời chat này")) : (replyData = {
                    mentioned_id: e.author.id
                },
                h.innerHTML = "Trả lời " + e.author.full_name,
                d.classList.remove("hidden"),
                void u.focus()) : void showLoginForm()
        },
        n
}

function setNavbarItem(e, t) {
    var n = document.createElement("div");
    n.className = "menu-sub-item";
    var i = "",
        r = "",
        o = e.thumbnail,
        a = e.name;
    return e.url && (r = e.url,
            i = ' target="_blank"'), !r && e.slug && (r = "/" + e.slug),
        r || (r = "/video/" + e.id),
        e.poster && (o = e.poster),
        e.title && (a = e.title),
        n.innerHTML = '<a href="' + r + '"' + i + '><img src="' + o + '"><div><span>' + a + "</span></div></a>",
        n
}

function setFilmItem(e, t) {
    t || (t = {});
    var n = document.createElement("div");
    n.className = "tray-item";
    var i = '<div class="tray-film-update">';
    if (e.is_movie || e.upcoming)
        i += e.time;
    else
        try {
            i += e.largest_episode.name + " / " + e.time
        } catch (e) {}
    i += "</div>";
    var r = "";
    return e.upcoming && (r = '<div class="tray-item-upcoming">SẮP CHIẾU</div>'),
        n.innerHTML = '<a href="/' + e.slug + '"><img class="tray-item-thumbnail" src="' + e.thumbnail + '"><div class="tray-item-description"><div class="tray-item-title">' + e.name + '</div><div class="tray-item-meta-info"><div class="tray-film-views">' + e.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " lượt xem</div></div></div>" + i + '<div class="tray-item-play-button"><i class="icon-play"></i></div>' + r + "</a>",
        n
}

function setCartoonItem(e, t) {
    t || (t = {});
    var n = document.createElement("div");
    return n.className = "tray-item",
        n.innerHTML = '<a href="https://mehoathinh.com/' + e.slug + '" target="_blank"><img class="tray-item-thumbnail" src="' + e.poster + '"><div class="tray-item-description"><div class="tray-item-title">' + e.name + '</div><div class="tray-item-meta-info"><div class="tray-film-views">' + e.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' lượt xem</div></div></div><div class="tray-item-play-button"><i class="icon-play"></i></div></a>',
        n
}

function setVideoItem(e) {
    var t = document.createElement("div"),
        n = Math.floor(e.duration / 60),
        i = e.duration - 60 * n;
    return n < 10 && (n = "0" + n),
        i < 10 && (i = "0" + i),
        t.className = "video-item",
        t.innerHTML = '<a href="/video/' + e.id + '"><img class="video-item-thumbnail" src="' + e.thumbnail + '"><div class="video-item-title">' + e.title + '</div><div class="video-item-duration">' + n + ":" + i + '</div><div class="video-item-play-button"><i class="icon-play"></i></div></a>',
        t
}

function setNewsItem(e) {
    var t = document.createElement("div");
    return t.className = "news-item",
        t.innerHTML = '<a href="' + e.url + '" target="_blank"><img class="news-item-thumbnail" src="' + e.thumbnail + '"></a><div class="news-item-meta"><div class="news-item-genre genre-' + e.site.id + '">' + e.site.name + '</div><a href="' + e.url + '" target="_blank"><div class="news-item-title">' + e.title + "</div></a></div>",
        t
}

function setMangaItem(e) {
    var t = document.createElement("div");
    return t.className = "manga-item",
        t.innerHTML = '<a href="https://truyentranh24.com/' + e.slug + "/" + e.chapter_slug + '" target="_blank"><img class="manga-item-thumbnail" src="' + e.thumbnail + '"><div class="manga-item-title">' + e.title + '</div><div class="manga-item-meta-info"><span class="manga-item-label">Chap ' + e.chapter_name + "</span></div></a>",
        t
}

function setRankingItem(e, t) {
    t += 1;
    var n = document.createElement("div");
    return n.className = "ranking-item l90 background-" + 2 * t,
        n.innerHTML = '<a href="/' + e.slug + '"><div class="ranking-item-thumbnail"><img src="' + e.thumbnail + '"></div><div class="ranking-item-top">' + t + '</div></a><div class="ranking-item-meta"><a href="/' + e.slug + '"><div class="ranking-item-title">' + e.name + "</div></a></div>",
        n
}

function setNavbarBlock(e, t, n) {
    if (!ismobile.any) {
        n.length = 8;
        for (var i = 0; i < n.length; i++) {
            "manga" == t && (n[i].url = "https://truyentranh24.com/" + n[i].slug);
            var r = setNavbarItem(n[i]);
            e.appendChild(r)
        }
    }
}

function setHomeBlock(e, t, n) {
    for (var i = 0; i < n.length; i++) {
        if (ismobile.any && i >= 8)
            return;
        var r = "";
        if ("ranking" == t) {
            if (i >= 6)
                return;
            r = setRankingItem(n[i], i)
        } else if ("film" == t || "picked" == t)
            r = setFilmItem(n[i]);
        else if ("cartoon" == t)
            r = setCartoonItem(n[i]);
        else if ("video" == t)
            r = setVideoItem(n[i]);
        else if ("manga" == t) {
            if (i >= 6)
                return;
            r = setMangaItem(n[i])
        } else
            "news" == t && (r = setNewsItem(n[i]));
        e.querySelector(".tray-content").appendChild(r)
    }
}

function getBlockData(e) {
    var t = e.getAttribute("data-block");
    if (blockData[t])
        return void setHomeBlock(e, t, blockData[t]);
    var n = sendAjax("GET", "/json/" + t + ".cache");
    n.onload = function() {
        var i = JSON.parse(n.responseText);
        200 == n.status && (blockData[t] = i,
            setHomeBlock(e, t, i))
    }
}

function createEmoji(e, t, n) {
    var i = createElementByJs(e + "-" + t.code.split(":")[1], "li", "emoji-item", {}, [{
        identity: "style",
        value: "background-image: url(https://s199.imacdn.com/emoticon/" + e + "/" + t.value + "); background-size: 100% 100%;"
    }]);
    return i.onclick = function() {
            n.value += " " + t.code
        },
        i
}

function clickOnEmojiTab(e, t, n, i, r, o) {
    e.onclick = function() {
        for (var a = r.querySelectorAll(".emoji-list"), s = a.length - 1; s >= 0; s--)
            a[s].classList.add("hidden");
        for (var s = t.length - 1; s >= 0; s--)
            t[s].classList.remove("activated");
        if (e.classList.add("activated"),
            i.classList.remove("hidden"), !i.querySelector(".emoji-item")) {
            for (var c = 0; c < emoji[n].length; c++)
                i.appendChild(createEmoji(n, emoji[n][c], o));
            Ps.initialize(i, {
                minScrollbarLength: 50,
                maxScrollbarLength: 50
            })
        }
    }
}

function createEmojiPicker(e, t) {
    function n(e) {
        r.contains(e.target) || i.contains(e.target) || r.classList.add("hidden")
    }
    for (var i = e.querySelector(".emoji-toggle"), r = e.querySelector(".emoji-picker"), o = e.querySelector(".emoji-close"), a = e.querySelectorAll(".emoji-picker-type"), s = 0; s < a.length; s++) {
        var c = a[s].getAttribute("data-tab"),
            l = r.querySelector(".emoji-list.emoji-" + c);
        clickOnEmojiTab(a[s], a, c, l, r, t)
    }
    i.onclick = function() {
            if (!_GLOBAL._IS_LOGGED_IN)
                return void showLoginForm();
            r.classList.toggle("hidden");
            var e = r.querySelector(".emoji-list");
            if (!e.querySelector(".emoji-item")) {
                for (var n = e.getAttribute("data-tab"), i = 0; i < emoji[n].length; i++)
                    e.appendChild(createEmoji(n, emoji[n][i], t));
                Ps.initialize(e, {
                    minScrollbarLength: 50,
                    maxScrollbarLength: 50
                })
            }
        },
        o.onclick = function() {
            r.classList.add("hidden")
        },
        window.addEventListener("click", n),
        ismobile.apple.device && window.addEventListener("touchstart", function(e) {
            n(e)
        })
}

function createChatForm(e, t) {
    function n() {
        var e = r.value;
        e.length && sendChat(e, r, c)
    }
    var i = e.querySelector(".chat-list"),
        r = e.querySelector("input"),
        o = e.querySelector(".button-more"),
        a = e.querySelector(".chat-mention"),
        s = a.querySelector("span"),
        c = a.querySelector(".remove-mention"),
        l = e.querySelector(".chat-upload-file"),
        u = e.querySelector(".chat-submit");
    createEmojiPicker(e, r),
        u && (u.onclick = function() {
            n()
        }),
        r.onkeyup = function(e) {
            13 == e.which && n()
        },
        l.onchange = function() {
            console.log("onchange");
            try {
                uploadChatImage(this.files[0])
            } catch (e) {
                t || alertify.logPosition("top right"),
                    alertify.error("Upload hình lỗi! Vui lòng thử lại")
            }
        };
    var d = {
        list: i,
        input: r,
        more: o,
        mention: a,
        mentionText: s
    };
    o.onclick = function() {
            var t = i.querySelectorAll(".chat-item").length - 1;
            loadMoreChat(e, t, d)
        },
        c.onclick = function() {
            a.classList.add("hidden"),
                s = "",
                replyData = {}
        },
        t && loadMoreChat(e, 0, d),
        socket.emit("chat.get", {
            id: _GLOBAL._USER_ID
        }),
        socket.on("chat-channel:message", function(e) {
            try {
                var n = i.querySelector(".chat-item");
                i.insertBefore(setChatItem(e, d), n)
            } catch (e) {}
            if (!t) {
                if (navbarRight.activated || "undefined" != typeof chatPage)
                    return;
                unreadChat.innerText = parseInt(unreadChat.innerText) + 1,
                    userChat.classList.add("has-item")
            }
        }),
        socket.on("chat-channel:messages:" + _GLOBAL._USER_ID, function(e) {
            for (var t = (i.querySelector(".chat-item"),
                    e.length - 1); t >= 0; t--)
                i.appendChild(setChatItem(e[t], d))
        })
}

function loadMoreChat(e, t, n) {
    if (!t) {
        if ((t = e.querySelectorAll(".chat-item").length - 1) > 0)
            return;
        n.input = e.querySelector("input"),
            n.list = e.querySelector(".chat-list"),
            n.more = e.querySelector(".button-more"),
            n.mention = e.querySelector(".chat-mention"),
            n.mentionText = n.mention.querySelector("span")
    }
    navbarLoading.classList.remove("hidden"),
        getChatMessages(t, n),
        navbarLoading.classList.add("hidden")
}

function displayContextMenu(e) {
    var t = document.body.getBoundingClientRect(),
        n = e.clientX - t.left,
        i = e.clientY - t.top;
    n + contextMenu.offsetWidth > document.body.offsetWidth && (n -= contextMenu.offsetWidth),
        i + contextMenu.offsetHeight > document.body.offsetHeight && (i -= contextMenu.offsetHeight),
        contextMenu.style.top = i + "px",
        contextMenu.style.left = n + "px",
        contextMenu.classList.remove("hidden")
}

function clickOnTab(e) {
    e.onclick = function() {
        for (var t = getAllElements(".navbar-user-body"), n = e.getAttribute("data-tab"), i = getElement(".tab-" + n), r = t.length - 1; r >= 0; r--)
            t[r].classList.add("hidden");
        for (var r = navbarTab.children.length - 1; r >= 0; r--)
            navbarTab.children[r].classList.remove("activated");
        e.classList.add("activated"),
            i.classList.remove("hidden"),
            ismobile.any || Ps.update(i)
    }
}

function activeNavbarLeft() {
    navbarLeft.classList.add("activated"),
        navbarRight.classList.remove("activated"),
        floatingAction.classList.remove("activated"),
        actionToggle.innerHTML = '<i class="icon-assistive"></i>',
        navbar.style.zIndex = "8888"
}

function activeNavbarRight() {
    navbarRight.classList.add("activated"),
        navbarLeft.classList.remove("activated"),
        floatingAction.classList.remove("activated"),
        actionToggle.innerHTML = '<i class="icon-assistive"></i>',
        navbar.style.zIndex = "8888",
        navbarRight.activated = !0
}

function lockScroll() {}

function unlockScroll() {}

function closeNavbar(e) {
    var t = 0,
        n = e.target;
    "ok" != n.className && (navbarLeft.contains(n) || navbarToggle.contains(n) || actionMenu.contains(n) || (navbarLeft.classList.remove("activated"),
            t++),
        navbarRight.contains(n) || navbarUser.contains(n) || actionUser.contains(n) || (navbarRight.classList.remove("activated"),
            navbarRight.activated = !1,
            t++),
        t > 1 && (navbar.style.zIndex = ""))
}

function hideSearchResult(e) {
    navbarSearch.contains(e.target) || searchResult.classList.remove("activated")
}

function hideFloatingAction() {
    if (!(window.innerWidth >= 1024))
        return window.innerHeight > window.innerWidth || getPageYOffset() > 100 ? void floatingAction.classList.remove("hidden") : void floatingAction.classList.add("hidden")
}

function setMenuHeight() {
    if (!ismobile.any)
        return void(navbarMenu.style = "");
    var e = window.innerHeight - 120;
    navbarMenu.style.maxHeight = e + "px",
        navbarMenu.style.overflow = "auto"
}

function resetUnreadNotifications() {
    if (0 != unreadNotification.innerText) {
        var e = sendAjax("DELETE", _GLOBAL._API + "/users/self/notifications/unread");
        e.onload = function() {
                unreadNotification.innerText = 0
            },
            e.onerror = function() {}
    }
}

function getNavbarBlockData(e) {
    var t = e.getAttribute("data-block");
    if (e.innerHTML = "",
        blockData[t])
        return void setNavbarBlock(e, t, blockData[t]);
    var n = sendAjax("GET", "/json/" + t + ".cache");
    n.onload = function() {
        var i = JSON.parse(n.responseText);
        200 == n.status && (blockData[t] = i,
            setNavbarBlock(e, t, i))
    }
}

function navbarOnload() {
    setMenuHeight(),
        hideFloatingAction()
}

function onRealtimeNotification() {
    socket && (socket.on("notification:user." + _GLOBAL._USER_ID, function(e) {
            setNoticeItem(e);
            try {
                notificationList.insertBefore(setNotificationItem(e), notificationList.firstChild)
            } catch (e) {}
            try {
                if (navbarRight.activated)
                    return;
                unreadNotification.innerText = parseInt(unreadNotification.innerText) + 1,
                    userNotification.classList.add("has-item")
            } catch (e) {}
        }),
        socket.on("notification:broadcast", function(e) {
            if (setNoticeItem(e),
                _GLOBAL._IS_LOGGED_IN) {
                try {
                    notificationList.insertBefore(setNotificationItem(e), notificationList.firstChild)
                } catch (e) {}
                try {
                    if (navbarRight.activated)
                        return;
                    unreadNotification.innerText = parseInt(unreadNotification.innerText) + 1,
                        userNotification.classList.add("has-item")
                } catch (e) {}
            }
        }),
        socket.on("notification:remove", function(e) {
            try {
                getElement(".notification-fixed").removeChild(getElement('.notification-fixed-item[data-id="' + e.id + '"]'))
            } catch (e) {}
            if (_GLOBAL._IS_LOGGED_IN) {
                try {
                    removeNotificationItem(e.id)
                } catch (e) {}
                var t = parseInt(unreadNotification.innerText);
                t && (unreadNotification.innerText = t - 1)
            }
        }),
        socket.on("notification:sponsor", function(e) {
            setNoticeItem(e)
        }))
}

function performMark() {
    var e = searchBox.value;
    e = e.trim().replace(/\s{2,}/g, " "),
        e = e.replace(/[&\/\\#,+()$~@$^%.'"*?<>{}]/g, " ");
    var t = {
        separateWordSearch: !0
    };
    markInstance.unmark({
        done: function() {
            markInstance.mark(e, t)
        }
    })
}

function checkSearchResult() {
    getAllElements(".result-item").length || (searchLoading.classList.add("hidden"),
        searchNoitem.classList.remove("hidden"),
        searchNoitem.innerHTML = "Nhập tên anime để tìm kiếm")
}

function searchFilms() {
    var e = searchBox.value;
    if (e = e.trim().replace(/\s{2,}/g, " "),
        (e = e.replace(/[&\/\\#,+()$~@$^%.'"*?<>{}]/g, " ")) && e != oldQuery) {
        oldQuery = e,
            searchLoading.classList.remove("hidden");
        var t = sendAjax("GET", _GLOBAL._API + "/search?q=" + e + "&limit=12");
        t.onload = function() {
                if (200 == t.status || 304 == t.status) {
                    var e = JSON.parse(t.responseText);
                    return console.log(e),
                        removeSearchResult(),
                        void setSearchResult(e.data)
                }
                searchLoading.classList.add("hidden")
            },
            t.onerror = function() {
                searchLoading.classList.add("hidden")
            }
    } else if (searchLoading.classList.add("hidden"), !e)
        return oldQuery = null,
            removeSearchResult(),
            void searchResult.classList.remove("activated")
}

function removeSearchResult() {
    searchResultBody.innerHTML = ""
}

function setSearchResult(e) {
    if (!e.length)
        return searchLoading.classList.add("hidden"),
            searchNoitem.classList.remove("hidden"),
            void(searchNoitem.innerHTML = "Không tìm thấy anime phù hợp");
    searchNoitem.classList.add("hidden");
    for (var t = 0; t < e.length; t++) {
        var n = document.createElement("div");
        n.className = "result-item",
            n.setAttribute("data-id", e[t].id),
            n.setAttribute("data-slug", e[t].slug),
            n.innerHTML = '<a href="/' + e[t].slug + '"><div class="result-item-thumbnail"><img src="' + e[t].thumbnail + '"></div><div class="result-item-meta"><div class="result-item-title">' + e[t].name + '</div><div class="result-item-time">' + (e[t].is_movie ? "" : (e[t].meta.max_episode_name ? e[t].meta.max_episode_name : 0) + " / ") + e[t].time + '</div><div class="result-item-views">' + e[t].views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " lượt xem</div></div></a>",
            searchResultBody.appendChild(n)
    }
    scrollTo(searchResultBody, 0, 100),
        searchLoading.classList.add("hidden"),
        ismobile.any || Ps.update(searchResultBody),
        performMark()
}

function setSearchResultHeight() {
    if (window.innerWidth >= 1024)
        return void(searchResultBody.style.height = "");
    searchResultBody.style.height = window.innerHeight - 115 + "px"
}

function gotoResultPage(e) {
    if (e)
        return void(window.location = _GLOBAL._URL + "/" + e);
    var t = searchBox.value;
    t = t.trim().replace(/\s{2,}/g, " "),
        (t = t.replace(/[&\/\\#,+()$~!@$^%.'"*?<>{}]/g, "")) && (window.location = _GLOBAL._URL + "/tim-kiem/" + t)
}

function searchOnLoad() {
    ismobile.any ? searchResultBody.style.overflow = "auto" : Ps.initialize(searchResultBody, {
            minScrollbarLength: 50,
            maxScrollbarLength: 50
        }),
        setSearchResultHeight()
}

function setCoverImage(e, t) {
    var n = document.createElement("img");
    n.src = e.querySelector("img").src,
        sliders[t] = n,
        sliderCover.appendChild(n),
        hoverOnSliderItem(e)
}

function setActivatedItem(e) {
    var t = sliderCover.querySelectorAll("img");
    try {
        for (var n = 1; n < t.length; n++)
            t[n].src != e.querySelector("img").src ? t[n].classList.remove("activated") : t[n].classList.add("activated");
        sliderTitle.innerText = e.getAttribute("data-title"),
            sliderViews.innerText = e.getAttribute("data-views"),
            sliderLink.href = e.children[0].href,
            setTargetOnLink(e)
    } catch (e) {}
}

function setTargetOnLink(e) {
    sliderLink.removeAttribute("target");
    try {
        (e.querySelector("a").getAttribute("target") || sliderCover.querySelectorAll("img.activated").length < 2) && sliderLink.setAttribute("target", "_blank")
    } catch (e) {}
}

function hoverOnSliderItem(e) {
    e.onmouseover = function() {
        setActivatedItem(e)
    }
}

function createSliderItem() {
    var e = document.createElement("div");
    e.className = "slider-item hidden",
        e.setAttribute("data-title", sliderTitle.innerText),
        e.setAttribute("data-views", sliderViews.innerText),
        e.innerHTML = sliderBanner ? '<a href="' + sliderLink.href + '" target="_blank"><img class="slider-item-img" src="' + sliderFirstImg.src + '"></a>' : '<a href="' + sliderLink.href + '"><img class="slider-item-img" src="' + sliderFirstImg.src + '"></a>',
        e.onmouseover = function() {
            setActivatedItem(e)
        },
        slider.appendChild(e)
}

function autoNextSlideItem() {
    clearInterval(progressInterval),
        progressPercent = 0,
        progressInterval = setInterval(function() {
            (progressPercent += 1) > 100 && (progressPercent = 0),
                getElement(".slider-progress").style.width = progressPercent + "%"
        }, 100),
        sliderInterval = setInterval(function() {
            sliderItems = getAllElements(".slider-item");
            var e = sliderItems[0].cloneNode(!0);
            e.classList.add("hidden");
            for (var t = 0; t < sliders.length; t++)
                sliders[t].classList.remove("activated");
            sliderPosition >= sliders.length ? sliderPosition = -1 : sliders[sliderPosition].classList.add("activated"),
                slider.appendChild(e),
                sliderLink.href = sliderItems[0].children[0].href,
                sliderTitle.innerText = sliderItems[0].getAttribute("data-title"),
                sliderViews.innerText = sliderItems[0].getAttribute("data-views"),
                setTargetOnLink(e),
                e.onmouseover = function() {
                    setActivatedItem(e)
                },
                removeElement(sliderItems[0]),
                sliderItems[sliderItems.length - 1].classList.remove("hidden"),
                sliderItems = getAllElements(".slider-item");
            for (var t = 0; t < sliders.length; t++)
                hoverOnSliderItem(sliders[t], t);
            sliderPosition++,
            progressPercent = 0
        }, 1e4)
}

function setAutoToSlider() {
    sliderAuto || (autoNextSlideItem(),
        createSliderItem(),
        sliderAuto = 1)
}

function updateLastLogin() {
    _GLOBAL._IS_LOGGED_IN
}

function uploadAvatar(e) {
    var t = new FormData;
    t.append("avatar", e);
    var n = new XMLHttpRequest;
    n.open("POST", _GLOBAL._API + "/users/self/avatar"),
        n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        n.setRequestHeader("X-CSRF-TOKEN", _GLOBAL._TOKEN),
        n.withCredentials = !0,
        n.send(t),
        n.onload = function() {
            if (200 == n.status) {
                var e = JSON.parse(n.responseText);
                if (e.avatar) {
                    try {
                        for (var t = getAllElements(".self-avatar"), i = 0; i < t.length; i++)
                            t[i].src = e.avatar
                    } catch (e) {}
                    return alertify.logPosition("top right"),
                        void alertify.success("Đổi hình đại diện thành công!")
                }
            }
            if (400 == n.status)
                return void alertify.error("Hình đại diện quá nhỏ! Hãy chọn hình kích thước lớn hơn 200x200");
            alertify.logPosition("top right"),
                alertify.error("Upload hình đại diện không thành công!")
        },
        n.onerror = function() {
            alertify.logPosition("top right"),
                alertify.error("Upload hình đại diện không thành công!")
        }
}

function setLoginTabHeight() {
    var e = window.innerHeight - 120;
    loginTab.style.maxHeight = e + "px",
        signupTab.style.maxHeight = e + "px",
        ismobile.any && (loginTab.style.overflow = "auto",
            signupTab.style.overflow = "auto")
}

function setInfomationTabHeight() {
    var e = window.innerHeight - 120;
    informationBody.style.maxHeight = e + "px",
        notificationBody.style.maxHeight = e + "px",
        _GLOBAL._REALTIME && (chatBody.style.maxHeight = e + "px"),
        ismobile.any && (informationBody.style.overflow = "auto",
            notificationBody.style.overflow = "auto",
            _GLOBAL._REALTIME && (chatBody.style.overflow = "auto"))
}

function validateLoginUsername() {
    var e = loginUsername.parentNode,
        t = e.querySelector(".tip");
    return loginUsername.value.length < 5 || loginUsername.value.length > 20 ? (t.innerText = "từ 6 - 20 kí tự",
        e.classList.add("warning"), !1) : (t.innerText = "",
        e.classList.remove("warning"), !0)
}

function validateSignupUsername() {
    var e = signupUsername.parentNode,
        t = e.querySelector(".tip");
    if (signupUsername.value.length < 6 || signupUsername.value.length > 20)
        return validated.username = !1,
            t.innerText = "từ 6 - 20 kí tự",
            void e.classList.add("warning");
    if (!validated.username || cachedValidate.username != signupUsername.value) {
        validated.username = !1,
            t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?username=" + signupUsername.value);
        n.onload = function() {
            if (200 == n.status || 304 == n.status)
                return cachedValidate.username = signupUsername.value,
                    e.classList.remove("warning"),
                    void(validated.username = !0);
            400 == n.status ? t.innerText = "không hợp lệ (bị cấm)" : 409 == n.status && (t.innerText = "đã tồn tại trong hệ thống"),
                validated.username = !1,
                cachedValidate.username = null,
                e.classList.add("warning")
        }
    }
}

function validatePassword(e) {
    var t = e.querySelector('input[name="password"]'),
        n = t.parentNode,
        i = n.querySelector(".tip");
    return t.value.length < 6 || t.value.length > 30 ? (validated.password = !1,
        i.innerText = "từ 6 - 30 kí tự",
        n.classList.add("warning"), !1) : (validated.password = !0,
        i.innerText = "",
        n.classList.remove("warning"), !0)
}

function validatePasswordConfirm() {
    var e = passwordConfirm.parentNode,
        t = e.querySelector(".tip");
    if (signupPassword.value != passwordConfirm.value)
        return validated.passwordConfirm = !1,
            t.innerText = "2 mật khẩu không khớp",
            void e.classList.add("warning");
    validated.passwordConfirm = !0,
        t.innerText = "",
        e.classList.remove("warning")
}

function validateFullName() {
    var e = fullName.parentNode,
        t = e.querySelector(".tip");
    if (fullName.value.length < 5 || fullName.value.length > 40)
        return validated.fullName = !1,
            t.innerText = "từ 8 - 40 kí tự",
            void e.classList.add("warning");
    if (!validated.fullName || cachedValidate.fullName != fullName.value) {
        validated.fullName = !1,
            t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?full_name=" + fullName.value);
        n.onload = function() {
            if (200 == n.status || 304 == n.status)
                return cachedValidate.fullName = fullName.value,
                    e.classList.remove("warning"),
                    void(validated.fullName = !0);
            400 == n.status ? t.innerText = "không hợp lệ (bị cấm)" : t.innerText = "hãy thử lại",
                validated.fullName = !1,
                cachedValidate.fullName = null,
                e.classList.add("warning")
        }
    }
}

function validateEmail() {
    var e = email.parentNode,
        t = e.querySelector(".tip");
    if (email.value.length < 8)
        return validated.email = !1,
            t.innerText = "email không hợp lệ",
            void e.classList.add("warning");
    if (!validated.email || cachedValidate.email != email.value) {
        validated.email = !1,
            t.innerText = "";
        var n = sendAjax("GET", _GLOBAL._API + "/users/validate?email=" + email.value);
        n.onload = function() {
            if (200 == n.status || 304 == n.status)
                return validated.email = !0,
                    cachedValidate.email = email.value,
                    void e.classList.remove("warning");
            400 == n.status ? t.innerText = "email không hợp lệ" : 409 == n.status && (t.innerText = "email đã tồn tại"),
                validated.email = !1,
                cachedValidate.email = null,
                e.classList.add("warning")
        }
    }
}

function validateBirthDate(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthDate.value < 1 || birthDate.value > 31 ? (validated.birthDate = !1,
        t.innerText = "chọn ngày sinh từ 1 - 31",
        formGroupBirthday.classList.add("warning"), !1) : (validated.birthDate = !0,
        t.innerText = "",
        formGroupBirthday.classList.remove("warning"), !e && validated.birthMonth && validated.birthYear && validateBirthday(!0), !0)
}

function validateBirthMonth(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthMonth.value < 1 || birthMonth.value > 12 ? (validated.birthMonth = !1,
        t.innerText = "chọn tháng sinh từ 1 - 12",
        formGroupBirthday.classList.add("warning"), !1) : (validated.birthMonth = !0,
        t.innerText = "",
        formGroupBirthday.classList.remove("warning"), !e && validated.birthDate && validated.birthYear && validateBirthday(!0), !0)
}

function validateBirthYear(e) {
    var t = formGroupBirthday.querySelector(".tip");
    return birthYear.value < 1970 || birthYear.value > 2010 ? (validated.birthYear = !1,
        t.innerText = "chọn năm sinh từ 1970 - 2010",
        formGroupBirthday.classList.add("warning"), !1) : (validated.birthYear = !0,
        t.innerText = "",
        formGroupBirthday.classList.remove("warning"), !e && validated.birthDate && validated.birthMonth && validateBirthday(!0), !0)
}

function validateBirthday(e) {
    if (e || validateBirthDate(!0) && validateBirthMonth(!0) && validateBirthYear(!0)) {
        var t = formGroupBirthday.querySelector(".tip"),
            n = parseInt(birthDate.value) + "-" + parseInt(birthMonth.value) + "-" + parseInt(birthYear.value),
            i = new Date(birthYear.value + "-" + birthMonth.value + "-" + birthDate.value);
        try {
            if (i.getDate() != parseInt(birthDate.value) || i.getMonth() + 1 != parseInt(birthMonth.value) || i.getFullYear() != parseInt(birthYear.value))
                return validated.birthday = !1,
                    cachedValidate.birthday = null,
                    t.innerText = "ngày " + n + " không hợp lệ",
                    void formGroupBirthday.classList.add("warning");
            validated.birthday = !0,
                cachedValidate.birthday = n
        } catch (e) {
            if (validated.birthday && cachedValidate.birthday == n)
                return;
            t.innerText = "",
                validated.birthday = !1;
            var r = sendAjax("GET", _GLOBAL._API + "/users/validate?birthday=" + n);
            r.onload = function() {
                if (200 == r.status || 304 == r.status)
                    return validated.birthday = !0,
                        cachedValidate.birthday = n,
                        void formGroupBirthday.classList.remove("warning");
                validated.birthday = !1,
                    cachedValidate.birthday = null,
                    t.innerText = "ngày " + n + " không hợp lệ",
                    formGroupBirthday.classList.add("warning")
            }
        }
    }
}

function getNotifications(e) {
    var t = getAllElements(".notification-item"),
        n = getElement(".notification-none"),
        i = t.length;
    if (e || (e = {}, !i)) {
        if (navbarLoading.classList.remove("hidden"),
            cachedNotifications.submitted) {
            if ((new Date).getTime() - cachedNotifications.submitted < 3e5)
                return n.classList.remove("hidden"),
                    n.innerText = "Không có thông báo",
                    void navbarLoading.classList.add("hidden")
        } else {
            var r = store.get("notifications");
            if (r && (new Date).getTime() - r.submitted < 3e5)
                return n.classList.remove("hidden"),
                    n.innerText = "Không có thông báo",
                    void navbarLoading.classList.add("hidden")
        }
        var o = sendAjax("GET", _GLOBAL._API + "/users/self/notifications?offset=" + i);
        o.onload = function() {
                if (200 == o.status) {
                    var e = JSON.parse(o.responseText);
                    i += e.data.length;
                    for (var t = 0; t < e.data.length; t++)
                        notificationList.appendChild(setNotificationItem(e.data[t]));
                    if (!i) {
                        n.classList.remove("hidden"),
                            n.innerText = "Không có thông báo",
                            navbarLoading.classList.add("hidden"),
                            cachedNotifications = e,
                            cachedNotifications.submitted = (new Date).getTime();
                        try {
                            store.set("notifications", cachedNotifications)
                        } catch (e) {
                            console.log(e)
                        }
                        return
                    }
                    n.classList.add("hidden"),
                        cachedNotifications = {};
                    try {
                        store.remove("notifications")
                    } catch (e) {}
                    i >= e.total ? notificationMore.classList.add("hidden") : notificationMore.classList.remove("hidden")
                }
                navbarLoading.classList.add("hidden")
            },
            o.onerror = function() {
                navbarLoading.classList.add("hidden")
            }
    }
}

function setNotificationItem(e) {
    var t = document.createElement("div");
    t.className = "notification-item",
        t.setAttribute("data-id", e.id);
    var n = "vài giây trước",
        i = "/assets/img/avatar.png",
        r = "javascript:void(0);";
    return e.created_at && (n = getTimeAgo(e.created_at)),
        e.thumbnail && (i = e.thumbnail),
        e.link && (r = e.link + '" target="_blank', -1 == e.link.indexOf("http") && (r = "/" + r)),
        t.innerHTML = '<a href="' + r + '"><div class="notification-item-thumbnail"><img src="' + i + '"></div></a><div class="notification-item-body"><a href="' + r + '"><div class="notification-item-title">' + e.content + '</div></a><div class="notification-item-time"><i class="icon icon-time"></i>' + n + "</div></div>",
        t
}

function removeNotificationItem(e) {
    try {
        notificationList.removeChild(getElement('.notification-item[data-id="' + e + '"]'))
    } catch (e) {}
}

function clearSignupForm() {
    for (var e = document.querySelector(".navbar-user-body.tab-signup").querySelectorAll('input[type="text"], input[type="password"], input[type="number"]'), t = e.length - 1; t >= 0; t--)
        e[t].value = "";
    validated = {},
        cachedValidate = {}
}

function signup() {
    var e = document.querySelector("#form-signup-warning");
    if (e.parentNode.classList.add("hidden"),
        e.innerHTML = "",
        navbarLoading.classList.remove("hidden"),
        signupButton.classList.add("disabled"),
        validateSignupUsername(),
        validatePassword(signupTab),
        validatePasswordConfirm(),
        validateFullName(),
        validateEmail(),
        validateBirthday(), !(validated.username && validated.password && validated.passwordConfirm && validated.fullName && validated.email && validated.birthday))
        return signupButton.classList.remove("disabled"),
            void navbarLoading.classList.add("hidden");
    var t = {
            username: cachedValidate.username,
            password: signupPassword.value,
            password_confirmation: passwordConfirm.value,
            full_name: cachedValidate.fullName,
            email: cachedValidate.email,
            birthday: cachedValidate.birthday,
            gender: parseInt(document.querySelector('input[name="gender"]:checked').value)
        },
        n = sendAjax("POST", _GLOBAL._API + "/users", t);
    n.onload = function() {
            if (signupButton.classList.remove("disabled"),
                201 == n.status)
                return document.querySelector(".navbar-tab-login").click(),
                    clearSignupForm(),
                    loginUsername.value = t.username,
                    loginPassword.value = t.password,
                    void setTimeout(function() {
                        loginButton.click()
                    }, 1e3);
            e.innerHTML = "<li>Đăng ký thất bại, vui lòng thử lại</li>",
                e.parentNode.classList.remove("hidden"),
                navbarLoading.classList.add("hidden")
        },
        n.onerror = function(t) {
            e.innerHTML = "<li>Lỗi kết nối, vui lòng thử lại</li>",
                e.parentNode.classList.remove("hidden"),
                signupButton.classList.remove("disabled"),
                navbarLoading.classList.add("hidden")
        }
}

function login() {
    var e = document.querySelector("#form-login-warning");
    if (e.parentNode.classList.add("hidden"),
        e.innerHTML = "",
        navbarLoading.classList.remove("hidden"),
        loginButton.classList.add("disabled"), !validateLoginUsername() || !validatePassword(loginTab))
        return e.innerHTML = "<li>Thông tin đăng nhập không chính xác</li>",
            e.parentNode.classList.remove("hidden"),
            loginButton.classList.remove("disabled"),
            void navbarLoading.classList.add("hidden");
    var t = document.querySelector('input[name="username"]').value,
        n = document.querySelector('input[name="password"]').value,
        i = document.querySelector('input[name="remember"]').checked,
        r = {
            username: t,
            password: n,
            remember: i
        },
        o = sendAjax("POST", _GLOBAL._API + "/users/login", r);
    o.onload = function() {
            if (200 == o.status)
                return void window.location.reload();
            400 == o.status ? e.innerHTML = "<li>Thông tin đăng nhập không chính xác</li>" : 403 == o.status && (e.innerHTML = "<li>Hệ thống đang tắt chức năng đăng nhập</li>"),
                e.parentNode.classList.remove("hidden"),
                loginButton.classList.remove("disabled"),
                navbarLoading.classList.add("hidden")
        },
        o.onerror = function(t) {
            e.innerHTML = "<li>Lỗi kết nối, vui lòng thử lại</li>",
                e.parentNode.classList.remove("hidden"),
                loginButton.classList.remove("disabled"),
                navbarLoading.classList.add("hidden")
        }
}

function logout() {
    var e = sendAjax("POST", _GLOBAL._API + "/users/logout");
    navbarLoading.classList.remove("hidden"),
        e.onload = function() {
            if (200 == e.status) {
                try {
                    store.forEach(function(e, t) {
                            "episode" == e.substring(0, 7) && store.remove(e)
                        }),
                        store.remove("notifications")
                } catch (e) {}
                window.location.reload()
            }
        },
        e.onerror = function(e) {
            navbarLoading.classList.add("hidden")
        }
}! function e(t, n, i) {
    function r(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var c = "function" == typeof require && require;
                if (!s && c)
                    return c(a, !0);
                if (o)
                    return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND",
                    l
            }
            var u = n[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                var n = t[a][1][e];
                return r(n || e)
            }, u, u.exports, e, t, n, i)
        }
        return n[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++)
        r(i[a]);
    return r
}({
    1: [function(e, t, n) {
        "use strict";
        var i = e("../main");
        "function" == typeof define && define.amd ? define(i) : (window.PerfectScrollbar = i,
            void 0 === window.Ps && (window.Ps = i))
    }, {
        "../main": 7
    }],
    2: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            var n = e.className.split(" ");
            n.indexOf(t) < 0 && n.push(t),
                e.className = n.join(" ")
        }

        function r(e, t) {
            var n = e.className.split(" "),
                i = n.indexOf(t);
            i >= 0 && n.splice(i, 1),
                e.className = n.join(" ")
        }
        n.add = function(e, t) {
                e.classList ? e.classList.add(t) : i(e, t)
            },
            n.remove = function(e, t) {
                e.classList ? e.classList.remove(t) : r(e, t)
            },
            n.list = function(e) {
                return e.classList ? Array.prototype.slice.apply(e.classList) : e.className.split(" ")
            }
    }, {}],
    3: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            return window.getComputedStyle(e)[t]
        }

        function r(e, t, n) {
            return "number" == typeof n && (n = n.toString() + "px"),
                e.style[t] = n,
                e
        }

        function o(e, t) {
            for (var n in t) {
                var i = t[n];
                "number" == typeof i && (i = i.toString() + "px"),
                    e.style[n] = i
            }
            return e
        }
        var a = {};
        a.e = function(e, t) {
                var n = document.createElement(e);
                return n.className = t,
                    n
            },
            a.appendTo = function(e, t) {
                return t.appendChild(e),
                    e
            },
            a.css = function(e, t, n) {
                return "object" == typeof t ? o(e, t) : void 0 === n ? i(e, t) : r(e, t, n)
            },
            a.matches = function(e, t) {
                return void 0 !== e.matches ? e.matches(t) : void 0 !== e.matchesSelector ? e.matchesSelector(t) : void 0 !== e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : void 0 !== e.mozMatchesSelector ? e.mozMatchesSelector(t) : void 0 !== e.msMatchesSelector ? e.msMatchesSelector(t) : void 0
            },
            a.remove = function(e) {
                void 0 !== e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e)
            },
            a.queryChildren = function(e, t) {
                return Array.prototype.filter.call(e.childNodes, function(e) {
                    return a.matches(e, t)
                })
            },
            t.exports = a
    }, {}],
    4: [function(e, t, n) {
        "use strict";
        var i = function(e) {
            this.element = e,
                this.events = {}
        };
        i.prototype.bind = function(e, t) {
                void 0 === this.events[e] && (this.events[e] = []),
                    this.events[e].push(t),
                    this.element.addEventListener(e, t, !1)
            },
            i.prototype.unbind = function(e, t) {
                var n = void 0 !== t;
                this.events[e] = this.events[e].filter(function(i) {
                    return !(!n || i === t) || (this.element.removeEventListener(e, i, !1), !1)
                }, this)
            },
            i.prototype.unbindAll = function() {
                for (var e in this.events)
                    this.unbind(e)
            };
        var r = function() {
            this.eventElements = []
        };
        r.prototype.eventElement = function(e) {
                var t = this.eventElements.filter(function(t) {
                    return t.element === e
                })[0];
                return void 0 === t && (t = new i(e),
                        this.eventElements.push(t)),
                    t
            },
            r.prototype.bind = function(e, t, n) {
                this.eventElement(e).bind(t, n)
            },
            r.prototype.unbind = function(e, t, n) {
                this.eventElement(e).unbind(t, n)
            },
            r.prototype.unbindAll = function() {
                for (var e = 0; e < this.eventElements.length; e++)
                    this.eventElements[e].unbindAll()
            },
            r.prototype.once = function(e, t, n) {
                var i = this.eventElement(e),
                    r = function(e) {
                        i.unbind(t, r),
                            n(e)
                    };
                i.bind(t, r)
            },
            t.exports = r
    }, {}],
    5: [function(e, t, n) {
        "use strict";
        t.exports = function() {
            function e() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function() {
                return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
            }
        }()
    }, {}],
    6: [function(e, t, n) {
        "use strict";
        var i = e("./class"),
            r = e("./dom"),
            o = n.toInt = function(e) {
                return parseInt(e, 10) || 0
            },
            a = n.clone = function(e) {
                if (e) {
                    if (e.constructor === Array)
                        return e.map(a);
                    if ("object" == typeof e) {
                        var t = {};
                        for (var n in e)
                            t[n] = a(e[n]);
                        return t
                    }
                    return e
                }
                return null
            };
        n.extend = function(e, t) {
                var n = a(e);
                for (var i in t)
                    n[i] = a(t[i]);
                return n
            },
            n.isEditable = function(e) {
                return r.matches(e, "input,[contenteditable]") || r.matches(e, "select,[contenteditable]") || r.matches(e, "textarea,[contenteditable]") || r.matches(e, "button,[contenteditable]")
            },
            n.removePsClasses = function(e) {
                for (var t = i.list(e), n = 0; n < t.length; n++) {
                    var r = t[n];
                    0 === r.indexOf("ps-") && i.remove(e, r)
                }
            },
            n.outerWidth = function(e) {
                return o(r.css(e, "width")) + o(r.css(e, "paddingLeft")) + o(r.css(e, "paddingRight")) + o(r.css(e, "borderLeftWidth")) + o(r.css(e, "borderRightWidth"))
            },
            n.startScrolling = function(e, t) {
                i.add(e, "ps-in-scrolling"),
                    void 0 !== t ? i.add(e, "ps-" + t) : (i.add(e, "ps-x"),
                        i.add(e, "ps-y"))
            },
            n.stopScrolling = function(e, t) {
                i.remove(e, "ps-in-scrolling"),
                    void 0 !== t ? i.remove(e, "ps-" + t) : (i.remove(e, "ps-x"),
                        i.remove(e, "ps-y"))
            },
            n.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(e, t, n) {
        "use strict";
        var i = e("./plugin/destroy"),
            r = e("./plugin/initialize"),
            o = e("./plugin/update");
        t.exports = {
            initialize: r,
            update: o,
            destroy: i
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(e, t, n) {
        "use strict";
        t.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function(e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            r = e("../lib/dom"),
            o = e("./instances");
        t.exports = function(e) {
            var t = o.get(e);
            t && (t.event.unbindAll(),
                r.remove(t.scrollbarX),
                r.remove(t.scrollbarY),
                r.remove(t.scrollbarXRail),
                r.remove(t.scrollbarYRail),
                i.removePsClasses(e),
                o.remove(e))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            function n(e) {
                return e.getBoundingClientRect()
            }
            var i = function(e) {
                e.stopPropagation()
            };
            t.event.bind(t.scrollbarY, "click", i),
                t.event.bind(t.scrollbarYRail, "click", function(i) {
                    var r = i.pageY - window.pageYOffset - n(t.scrollbarYRail).top,
                        s = r > t.scrollbarYTop ? 1 : -1;
                    a(e, "top", e.scrollTop + s * t.containerHeight),
                        o(e),
                        i.stopPropagation()
                }),
                t.event.bind(t.scrollbarX, "click", i),
                t.event.bind(t.scrollbarXRail, "click", function(i) {
                    var r = i.pageX - window.pageXOffset - n(t.scrollbarXRail).left,
                        s = r > t.scrollbarXLeft ? 1 : -1;
                    a(e, "left", e.scrollLeft + s * t.containerWidth),
                        o(e),
                        i.stopPropagation()
                })
        }
        var r = e("../instances"),
            o = e("../update-geometry"),
            a = e("../update-scroll");
        t.exports = function(e) {
            i(e, r.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n) {
                var r = i + n * t.railXRatio,
                    a = Math.max(0, t.scrollbarXRail.getBoundingClientRect().left) + t.railXRatio * (t.railXWidth - t.scrollbarXWidth);
                t.scrollbarXLeft = r < 0 ? 0 : r > a ? a : r;
                var s = o.toInt(t.scrollbarXLeft * (t.contentWidth - t.containerWidth) / (t.containerWidth - t.railXRatio * t.scrollbarXWidth)) - t.negativeScrollAdjustment;
                l(e, "left", s)
            }
            var i = null,
                r = null,
                s = function(t) {
                    n(t.pageX - r),
                        c(e),
                        t.stopPropagation(),
                        t.preventDefault()
                },
                u = function() {
                    o.stopScrolling(e, "x"),
                        t.event.unbind(t.ownerDocument, "mousemove", s)
                };
            t.event.bind(t.scrollbarX, "mousedown", function(n) {
                r = n.pageX,
                    i = o.toInt(a.css(t.scrollbarX, "left")) * t.railXRatio,
                    o.startScrolling(e, "x"),
                    t.event.bind(t.ownerDocument, "mousemove", s),
                    t.event.once(t.ownerDocument, "mouseup", u),
                    n.stopPropagation(),
                    n.preventDefault()
            })
        }

        function r(e, t) {
            function n(n) {
                var r = i + n * t.railYRatio,
                    a = Math.max(0, t.scrollbarYRail.getBoundingClientRect().top) + t.railYRatio * (t.railYHeight - t.scrollbarYHeight);
                t.scrollbarYTop = r < 0 ? 0 : r > a ? a : r;
                var s = o.toInt(t.scrollbarYTop * (t.contentHeight - t.containerHeight) / (t.containerHeight - t.railYRatio * t.scrollbarYHeight));
                l(e, "top", s)
            }
            var i = null,
                r = null,
                s = function(t) {
                    n(t.pageY - r),
                        c(e),
                        t.stopPropagation(),
                        t.preventDefault()
                },
                u = function() {
                    o.stopScrolling(e, "y"),
                        t.event.unbind(t.ownerDocument, "mousemove", s)
                };
            t.event.bind(t.scrollbarY, "mousedown", function(n) {
                r = n.pageY,
                    i = o.toInt(a.css(t.scrollbarY, "top")) * t.railYRatio,
                    o.startScrolling(e, "y"),
                    t.event.bind(t.ownerDocument, "mousemove", s),
                    t.event.once(t.ownerDocument, "mouseup", u),
                    n.stopPropagation(),
                    n.preventDefault()
            })
        }
        var o = e("../../lib/helper"),
            a = e("../../lib/dom"),
            s = e("../instances"),
            c = e("../update-geometry"),
            l = e("../update-scroll");
        t.exports = function(e) {
            var t = s.get(e);
            i(e, t),
                r(e, t)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n, i) {
                var r = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive)
                        return !1;
                    if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && i < 0)
                        return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive)
                        return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0)
                        return !t.settings.wheelPropagation
                }
                return !0
            }
            var i = !1;
            t.event.bind(e, "mouseenter", function() {
                    i = !0
                }),
                t.event.bind(e, "mouseleave", function() {
                    i = !1
                });
            var a = !1;
            t.event.bind(t.ownerDocument, "keydown", function(l) {
                if (!(l.isDefaultPrevented && l.isDefaultPrevented() || l.defaultPrevented)) {
                    var u = o.matches(t.scrollbarX, ":focus") || o.matches(t.scrollbarY, ":focus");
                    if (i || u) {
                        var d = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName)
                                d = d.contentDocument.activeElement;
                            else
                                for (; d.shadowRoot;)
                                    d = d.shadowRoot.activeElement;
                            if (r.isEditable(d))
                                return
                        }
                        var h = 0,
                            f = 0;
                        switch (l.which) {
                            case 37:
                                h = l.metaKey ? -t.contentWidth : l.altKey ? -t.containerWidth : -30;
                                break;
                            case 38:
                                f = l.metaKey ? t.contentHeight : l.altKey ? t.containerHeight : 30;
                                break;
                            case 39:
                                h = l.metaKey ? t.contentWidth : l.altKey ? t.containerWidth : 30;
                                break;
                            case 40:
                                f = l.metaKey ? -t.contentHeight : l.altKey ? -t.containerHeight : -30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = l.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                f = -90;
                                break;
                            case 35:
                                f = l.ctrlKey ? -t.contentHeight : -t.containerHeight;
                                break;
                            case 36:
                                f = l.ctrlKey ? e.scrollTop : t.containerHeight;
                                break;
                            default:
                                return
                        }
                        c(e, "top", e.scrollTop - f),
                            c(e, "left", e.scrollLeft + h),
                            s(e),
                            (a = n(h, f)) && l.preventDefault()
                    }
                }
            })
        }
        var r = e("../../lib/helper"),
            o = e("../../lib/dom"),
            a = e("../instances"),
            s = e("../update-geometry"),
            c = e("../update-scroll");
        t.exports = function(e) {
            i(e, a.get(e))
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            function n(n, i) {
                var r = e.scrollTop;
                if (0 === n) {
                    if (!t.scrollbarYActive)
                        return !1;
                    if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && i < 0)
                        return !t.settings.wheelPropagation
                }
                var o = e.scrollLeft;
                if (0 === i) {
                    if (!t.scrollbarXActive)
                        return !1;
                    if (0 === o && n < 0 || o >= t.contentWidth - t.containerWidth && n > 0)
                        return !t.settings.wheelPropagation
                }
                return !0
            }

            function i(e) {
                var t = e.deltaX,
                    n = -1 * e.deltaY;
                return void 0 !== t && void 0 !== n || (t = -1 * e.wheelDeltaX / 6,
                        n = e.wheelDeltaY / 6),
                    e.deltaMode && 1 === e.deltaMode && (t *= 10,
                        n *= 10),
                    t !== t && n !== n && (t = 0,
                        n = e.wheelDelta),
                    e.shiftKey ? [-n, -t] : [t, n]
            }

            function r(t, n) {
                var i = e.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (i) {
                    if (!window.getComputedStyle(i).overflow.match(/(scroll|auto)/))
                        return !1;
                    var r = i.scrollHeight - i.clientHeight;
                    if (r > 0 && !(0 === i.scrollTop && n > 0 || i.scrollTop === r && n < 0))
                        return !0;
                    var o = i.scrollLeft - i.clientWidth;
                    if (o > 0 && !(0 === i.scrollLeft && t < 0 || i.scrollLeft === o && t > 0))
                        return !0
                }
                return !1
            }

            function s(s) {
                var l = i(s),
                    u = l[0],
                    d = l[1];
                r(u, d) || (c = !1,
                    t.settings.useBothWheelAxes ? t.scrollbarYActive && !t.scrollbarXActive ? (d ? a(e, "top", e.scrollTop - d * t.settings.wheelSpeed) : a(e, "top", e.scrollTop + u * t.settings.wheelSpeed),
                        c = !0) : t.scrollbarXActive && !t.scrollbarYActive && (u ? a(e, "left", e.scrollLeft + u * t.settings.wheelSpeed) : a(e, "left", e.scrollLeft - d * t.settings.wheelSpeed),
                        c = !0) : (a(e, "top", e.scrollTop - d * t.settings.wheelSpeed),
                        a(e, "left", e.scrollLeft + u * t.settings.wheelSpeed)),
                    o(e),
                    (c = c || n(u, d)) && (s.stopPropagation(),
                        s.preventDefault()))
            }
            var c = !1;
            void 0 !== window.onwheel ? t.event.bind(e, "wheel", s) : void 0 !== window.onmousewheel && t.event.bind(e, "mousewheel", s)
        }
        var r = e("../instances"),
            o = e("../update-geometry"),
            a = e("../update-scroll");
        t.exports = function(e) {
            i(e, r.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            t.event.bind(e, "scroll", function() {
                o(e)
            })
        }
        var r = e("../instances"),
            o = e("../update-geometry");
        t.exports = function(e) {
            i(e, r.get(e))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            function n() {
                var e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === e.toString().length ? null : e.getRangeAt(0).commonAncestorContainer
            }

            function i() {
                l || (l = setInterval(function() {
                    return o.get(e) ? (s(e, "top", e.scrollTop + u.top),
                        s(e, "left", e.scrollLeft + u.left),
                        void a(e)) : void clearInterval(l)
                }, 50))
            }

            function c() {
                l && (clearInterval(l),
                        l = null),
                    r.stopScrolling(e)
            }
            var l = null,
                u = {
                    top: 0,
                    left: 0
                },
                d = !1;
            t.event.bind(t.ownerDocument, "selectionchange", function() {
                    e.contains(n()) ? d = !0 : (d = !1,
                        c())
                }),
                t.event.bind(window, "mouseup", function() {
                    d && (d = !1,
                        c())
                }),
                t.event.bind(window, "keyup", function() {
                    d && (d = !1,
                        c())
                }),
                t.event.bind(window, "mousemove", function(t) {
                    if (d) {
                        var n = {
                                x: t.pageX,
                                y: t.pageY
                            },
                            o = {
                                left: e.offsetLeft,
                                right: e.offsetLeft + e.offsetWidth,
                                top: e.offsetTop,
                                bottom: e.offsetTop + e.offsetHeight
                            };
                        n.x < o.left + 3 ? (u.left = -5,
                                r.startScrolling(e, "x")) : n.x > o.right - 3 ? (u.left = 5,
                                r.startScrolling(e, "x")) : u.left = 0,
                            n.y < o.top + 3 ? (u.top = o.top + 3 - n.y < 5 ? -5 : -20,
                                r.startScrolling(e, "y")) : n.y > o.bottom - 3 ? (u.top = n.y - o.bottom + 3 < 5 ? 5 : 20,
                                r.startScrolling(e, "y")) : u.top = 0,
                            0 === u.top && 0 === u.left ? c() : i()
                    }
                })
        }
        var r = e("../../lib/helper"),
            o = e("../instances"),
            a = e("../update-geometry"),
            s = e("../update-scroll");
        t.exports = function(e) {
            i(e, o.get(e))
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(e, t, n) {
        "use strict";

        function i(e, t, n, i) {
            function r(n, i) {
                var r = e.scrollTop,
                    o = e.scrollLeft,
                    a = Math.abs(n),
                    s = Math.abs(i);
                if (s > a) {
                    if (i < 0 && r === t.contentHeight - t.containerHeight || i > 0 && 0 === r)
                        return !t.settings.swipePropagation
                } else if (a > s && (n < 0 && o === t.contentWidth - t.containerWidth || n > 0 && 0 === o))
                    return !t.settings.swipePropagation;
                return !0
            }

            function c(t, n) {
                s(e, "top", e.scrollTop - n),
                    s(e, "left", e.scrollLeft - t),
                    a(e)
            }

            function l() {
                w = !0
            }

            function u() {
                w = !1
            }

            function d(e) {
                return e.targetTouches ? e.targetTouches[0] : e
            }

            function h(e) {
                return !(!e.targetTouches || 1 !== e.targetTouches.length) || !(!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)
            }

            function f(e) {
                if (h(e)) {
                    k = !0;
                    var t = d(e);
                    m.pageX = t.pageX,
                        m.pageY = t.pageY,
                        v = (new Date).getTime(),
                        null !== b && clearInterval(b),
                        e.stopPropagation()
                }
            }

            function p(e) {
                if (!k && t.settings.swipePropagation && f(e), !w && k && h(e)) {
                    var n = d(e),
                        i = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        },
                        o = i.pageX - m.pageX,
                        a = i.pageY - m.pageY;
                    c(o, a),
                        m = i;
                    var s = (new Date).getTime(),
                        l = s - v;
                    l > 0 && (y.x = o / l,
                            y.y = a / l,
                            v = s),
                        r(o, a) && (e.stopPropagation(),
                            e.preventDefault())
                }
            }

            function g() {
                !w && k && (k = !1,
                    clearInterval(b),
                    b = setInterval(function() {
                        return o.get(e) && (y.x || y.y) ? Math.abs(y.x) < .01 && Math.abs(y.y) < .01 ? void clearInterval(b) : (c(30 * y.x, 30 * y.y),
                            y.x *= .8,
                            void(y.y *= .8)) : void clearInterval(b)
                    }, 10))
            }
            var m = {},
                v = 0,
                y = {},
                b = null,
                w = !1,
                k = !1;
            n ? (t.event.bind(window, "touchstart", l),
                t.event.bind(window, "touchend", u),
                t.event.bind(e, "touchstart", f),
                t.event.bind(e, "touchmove", p),
                t.event.bind(e, "touchend", g)) : i && (window.PointerEvent ? (t.event.bind(window, "pointerdown", l),
                t.event.bind(window, "pointerup", u),
                t.event.bind(e, "pointerdown", f),
                t.event.bind(e, "pointermove", p),
                t.event.bind(e, "pointerup", g)) : window.MSPointerEvent && (t.event.bind(window, "MSPointerDown", l),
                t.event.bind(window, "MSPointerUp", u),
                t.event.bind(e, "MSPointerDown", f),
                t.event.bind(e, "MSPointerMove", p),
                t.event.bind(e, "MSPointerUp", g)))
        }
        var r = e("../../lib/helper"),
            o = e("../instances"),
            a = e("../update-geometry"),
            s = e("../update-scroll");
        t.exports = function(e) {
            if (r.env.supportsTouch || r.env.supportsIePointer) {
                i(e, o.get(e), r.env.supportsTouch, r.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            r = e("../lib/class"),
            o = e("./instances"),
            a = e("./update-geometry"),
            s = {
                "click-rail": e("./handler/click-rail"),
                "drag-scrollbar": e("./handler/drag-scrollbar"),
                keyboard: e("./handler/keyboard"),
                wheel: e("./handler/mouse-wheel"),
                touch: e("./handler/touch"),
                selection: e("./handler/selection")
            },
            c = e("./handler/native-scroll");
        t.exports = function(e, t) {
            t = "object" == typeof t ? t : {},
                r.add(e, "ps-container");
            var n = o.add(e);
            n.settings = i.extend(n.settings, t),
                r.add(e, "ps-theme-" + n.settings.theme),
                n.settings.handlers.forEach(function(t) {
                    s[t](e)
                }),
                c(e),
                a(e)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(e, t, n) {
        "use strict";

        function i(e) {
            function t() {
                c.add(e, "ps-focus")
            }

            function n() {
                c.remove(e, "ps-focus")
            }
            var i = this;
            i.settings = s.clone(l),
                i.containerWidth = null,
                i.containerHeight = null,
                i.contentWidth = null,
                i.contentHeight = null,
                i.isRtl = "rtl" === u.css(e, "direction"),
                i.isNegativeScroll = function() {
                    var t = e.scrollLeft,
                        n = null;
                    return e.scrollLeft = -1,
                        n = e.scrollLeft < 0,
                        e.scrollLeft = t,
                        n
                }(),
                i.negativeScrollAdjustment = i.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0,
                i.event = new d,
                i.ownerDocument = e.ownerDocument || document,
                i.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), e),
                i.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), i.scrollbarXRail),
                i.scrollbarX.setAttribute("tabindex", 0),
                i.event.bind(i.scrollbarX, "focus", t),
                i.event.bind(i.scrollbarX, "blur", n),
                i.scrollbarXActive = null,
                i.scrollbarXWidth = null,
                i.scrollbarXLeft = null,
                i.scrollbarXBottom = s.toInt(u.css(i.scrollbarXRail, "bottom")),
                i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom,
                i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : s.toInt(u.css(i.scrollbarXRail, "top")),
                i.railBorderXWidth = s.toInt(u.css(i.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(i.scrollbarXRail, "borderRightWidth")),
                u.css(i.scrollbarXRail, "display", "block"),
                i.railXMarginWidth = s.toInt(u.css(i.scrollbarXRail, "marginLeft")) + s.toInt(u.css(i.scrollbarXRail, "marginRight")),
                u.css(i.scrollbarXRail, "display", ""),
                i.railXWidth = null,
                i.railXRatio = null,
                i.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), e),
                i.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), i.scrollbarYRail),
                i.scrollbarY.setAttribute("tabindex", 0),
                i.event.bind(i.scrollbarY, "focus", t),
                i.event.bind(i.scrollbarY, "blur", n),
                i.scrollbarYActive = null,
                i.scrollbarYHeight = null,
                i.scrollbarYTop = null,
                i.scrollbarYRight = s.toInt(u.css(i.scrollbarYRail, "right")),
                i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight,
                i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : s.toInt(u.css(i.scrollbarYRail, "left")),
                i.scrollbarYOuterWidth = i.isRtl ? s.outerWidth(i.scrollbarY) : null,
                i.railBorderYWidth = s.toInt(u.css(i.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(i.scrollbarYRail, "borderBottomWidth")),
                u.css(i.scrollbarYRail, "display", "block"),
                i.railYMarginHeight = s.toInt(u.css(i.scrollbarYRail, "marginTop")) + s.toInt(u.css(i.scrollbarYRail, "marginBottom")),
                u.css(i.scrollbarYRail, "display", ""),
                i.railYHeight = null,
                i.railYRatio = null
        }

        function r(e) {
            return e.getAttribute("data-ps-id")
        }

        function o(e, t) {
            e.setAttribute("data-ps-id", t)
        }

        function a(e) {
            e.removeAttribute("data-ps-id")
        }
        var s = e("../lib/helper"),
            c = e("../lib/class"),
            l = e("./default-setting"),
            u = e("../lib/dom"),
            d = e("../lib/event-manager"),
            h = e("../lib/guid"),
            f = {};
        n.add = function(e) {
                var t = h();
                return o(e, t),
                    f[t] = new i(e),
                    f[t]
            },
            n.remove = function(e) {
                delete f[r(e)],
                    a(e)
            },
            n.get = function(e) {
                return f[r(e)]
            }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)),
                e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)),
                t
        }

        function r(e, t) {
            var n = {
                width: t.railXWidth
            };
            t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft,
                t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - e.scrollTop : n.top = t.scrollbarXTop + e.scrollTop,
                s.css(t.scrollbarXRail, n);
            var i = {
                top: e.scrollTop,
                height: t.railYHeight
            };
            t.isScrollbarYUsingRight ? t.isRtl ? i.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : i.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? i.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : i.left = t.scrollbarYLeft + e.scrollLeft,
                s.css(t.scrollbarYRail, i),
                s.css(t.scrollbarX, {
                    left: t.scrollbarXLeft,
                    width: t.scrollbarXWidth - t.railBorderXWidth
                }),
                s.css(t.scrollbarY, {
                    top: t.scrollbarYTop,
                    height: t.scrollbarYHeight - t.railBorderYWidth
                })
        }
        var o = e("../lib/helper"),
            a = e("../lib/class"),
            s = e("../lib/dom"),
            c = e("./instances"),
            l = e("./update-scroll");
        t.exports = function(e) {
            var t = c.get(e);
            t.containerWidth = e.clientWidth,
                t.containerHeight = e.clientHeight,
                t.contentWidth = e.scrollWidth,
                t.contentHeight = e.scrollHeight;
            var n;
            e.contains(t.scrollbarXRail) || (n = s.queryChildren(e, ".ps-scrollbar-x-rail"),
                    n.length > 0 && n.forEach(function(e) {
                        s.remove(e)
                    }),
                    s.appendTo(t.scrollbarXRail, e)),
                e.contains(t.scrollbarYRail) || (n = s.queryChildren(e, ".ps-scrollbar-y-rail"),
                    n.length > 0 && n.forEach(function(e) {
                        s.remove(e)
                    }),
                    s.appendTo(t.scrollbarYRail, e)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0,
                    t.railXWidth = t.containerWidth - t.railXMarginWidth,
                    t.railXRatio = t.containerWidth / t.railXWidth,
                    t.scrollbarXWidth = i(t, o.toInt(t.railXWidth * t.containerWidth / t.contentWidth)),
                    t.scrollbarXLeft = o.toInt((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0,
                    t.railYHeight = t.containerHeight - t.railYMarginHeight,
                    t.railYRatio = t.containerHeight / t.railYHeight,
                    t.scrollbarYHeight = i(t, o.toInt(t.railYHeight * t.containerHeight / t.contentHeight)),
                    t.scrollbarYTop = o.toInt(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1,
                t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
                t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
                r(e, t),
                t.scrollbarXActive ? a.add(e, "ps-active-x") : (a.remove(e, "ps-active-x"),
                    t.scrollbarXWidth = 0,
                    t.scrollbarXLeft = 0,
                    l(e, "left", 0)),
                t.scrollbarYActive ? a.add(e, "ps-active-y") : (a.remove(e, "ps-active-y"),
                    t.scrollbarYHeight = 0,
                    t.scrollbarYTop = 0,
                    l(e, "top", 0))
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(e, t, n) {
        "use strict";
        var i, r, o = e("./instances"),
            a = function(e) {
                var t = document.createEvent("Event");
                return t.initEvent(e, !0, !0),
                    t
            };
        t.exports = function(e, t, n) {
            if (void 0 === e)
                throw "You must provide an element to the update-scroll function";
            if (void 0 === t)
                throw "You must provide an axis to the update-scroll function";
            if (void 0 === n)
                throw "You must provide a value to the update-scroll function";
            "top" === t && n <= 0 && (e.scrollTop = n = 0,
                    e.dispatchEvent(a("ps-y-reach-start"))),
                "left" === t && n <= 0 && (e.scrollLeft = n = 0,
                    e.dispatchEvent(a("ps-x-reach-start")));
            var s = o.get(e);
            "top" === t && n >= s.contentHeight - s.containerHeight && (n = s.contentHeight - s.containerHeight,
                    n - e.scrollTop <= 1 ? n = e.scrollTop : e.scrollTop = n,
                    e.dispatchEvent(a("ps-y-reach-end"))),
                "left" === t && n >= s.contentWidth - s.containerWidth && (n = s.contentWidth - s.containerWidth,
                    n - e.scrollLeft <= 1 ? n = e.scrollLeft : e.scrollLeft = n,
                    e.dispatchEvent(a("ps-x-reach-end"))),
                i || (i = e.scrollTop),
                r || (r = e.scrollLeft),
                "top" === t && n < i && e.dispatchEvent(a("ps-scroll-up")),
                "top" === t && n > i && e.dispatchEvent(a("ps-scroll-down")),
                "left" === t && n < r && e.dispatchEvent(a("ps-scroll-left")),
                "left" === t && n > r && e.dispatchEvent(a("ps-scroll-right")),
                "top" === t && (e.scrollTop = i = n,
                    e.dispatchEvent(a("ps-scroll-y"))),
                "left" === t && (e.scrollLeft = r = n,
                    e.dispatchEvent(a("ps-scroll-x")))
        }
    }, {
        "./instances": 18
    }],
    21: [function(e, t, n) {
        "use strict";
        var i = e("../lib/helper"),
            r = e("../lib/dom"),
            o = e("./instances"),
            a = e("./update-geometry"),
            s = e("./update-scroll");
        t.exports = function(e) {
            var t = o.get(e);
            t && (t.negativeScrollAdjustment = t.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0,
                r.css(t.scrollbarXRail, "display", "block"),
                r.css(t.scrollbarYRail, "display", "block"),
                t.railXMarginWidth = i.toInt(r.css(t.scrollbarXRail, "marginLeft")) + i.toInt(r.css(t.scrollbarXRail, "marginRight")),
                t.railYMarginHeight = i.toInt(r.css(t.scrollbarYRail, "marginTop")) + i.toInt(r.css(t.scrollbarYRail, "marginBottom")),
                r.css(t.scrollbarXRail, "display", "none"),
                r.css(t.scrollbarYRail, "display", "none"),
                a(e),
                s(e, "top", e.scrollTop),
                s(e, "left", e.scrollLeft),
                r.css(t.scrollbarXRail, "display", ""),
                r.css(t.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]),
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.store = t()
}(this, function() {
    var e, t = {},
        n = window,
        i = n.document,
        r = "localStorage",
        o = "script";
    if (t.disabled = !1,
        t.version = "1.3.19",
        t.set = function(e, t) {},
        t.get = function(e, t) {},
        t.has = function(e) {
            return void 0 !== t.get(e)
        },
        t.remove = function(e) {},
        t.clear = function() {},
        t.transact = function(e, n, i) {
            null == i && (i = n,
                    n = null),
                null == n && (n = {});
            var r = t.get(e, n);
            i(r),
                t.set(e, r)
        },
        t.getAll = function() {},
        t.forEach = function() {},
        t.serialize = function(e) {
            return JSON.stringify(e)
        },
        t.deserialize = function(e) {
            if ("string" == typeof e)
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return e || void 0
                }
        },
        function() {
            try {
                return r in n && n[r]
            } catch (e) {
                return !1
            }
        }())
        e = n[r],
        t.set = function(n, i) {
            return void 0 === i ? t.remove(n) : (e.setItem(n, t.serialize(i)),
                i)
        },
        t.get = function(n, i) {
            var r = t.deserialize(e.getItem(n));
            return void 0 === r ? i : r
        },
        t.remove = function(t) {
            e.removeItem(t)
        },
        t.clear = function() {
            e.clear()
        },
        t.getAll = function() {
            var e = {};
            return t.forEach(function(t, n) {
                    e[t] = n
                }),
                e
        },
        t.forEach = function(n) {
            for (var i = 0; i < e.length; i++) {
                var r = e.key(i);
                n(r, t.get(r))
            }
        };
    else if (i.documentElement.addBehavior) {
        var a, s;
        try {
            s = new ActiveXObject("htmlfile"),
                s.open(),
                s.write("<" + o + ">document.w=window</" + o + '><iframe src="/favicon.ico"></iframe>'),
                s.close(),
                a = s.w.frames[0].document,
                e = a.createElement("div")
        } catch (t) {
            e = i.createElement("div"),
                a = i.body
        }
        var c = function(n) {
                return function() {
                    var i = Array.prototype.slice.call(arguments, 0);
                    i.unshift(e),
                        a.appendChild(e),
                        e.addBehavior("#default#userData"),
                        e.load(r);
                    var o = n.apply(t, i);
                    return a.removeChild(e),
                        o
                }
            },
            l = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
            u = function(e) {
                return e.replace(/^d/, "___$&").replace(l, "___")
            };
        t.set = c(function(e, n, i) {
                return n = u(n),
                    void 0 === i ? t.remove(n) : (e.setAttribute(n, t.serialize(i)),
                        e.save(r),
                        i)
            }),
            t.get = c(function(e, n, i) {
                n = u(n);
                var r = t.deserialize(e.getAttribute(n));
                return void 0 === r ? i : r
            }),
            t.remove = c(function(e, t) {
                t = u(t),
                    e.removeAttribute(t),
                    e.save(r)
            }),
            t.clear = c(function(e) {
                var t = e.XMLDocument.documentElement.attributes;
                for (e.load(r); t.length;)
                    e.removeAttribute(t[0].name);
                e.save(r)
            }),
            t.getAll = function(e) {
                var n = {};
                return t.forEach(function(e, t) {
                        n[e] = t
                    }),
                    n
            },
            t.forEach = c(function(e, n) {
                for (var i, r = e.XMLDocument.documentElement.attributes, o = 0; i = r[o]; ++o)
                    n(i.name, t.deserialize(e.getAttribute(i.name)))
            })
    }
    try {
        var d = "__storejs__";
        t.set(d, d),
            t.get(d) != d && (t.disabled = !0),
            t.remove(d)
    } catch (e) {
        t.disabled = !0
    }
    return t.enabled = !t.disabled,
        t
}),
function(e) {
    var t = /iPhone/i,
        n = /iPod/i,
        i = /iPad/i,
        r = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        o = /Android/i,
        a = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        s = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        c = /IEMobile/i,
        l = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        u = /BlackBerry/i,
        d = /BB10/i,
        h = /Opera Mini/i,
        f = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        p = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        g = /UC.*Browser|UCWEB/i,
        m = /AppleTV/i,
        v = /(GoogleTV|CrKey)/i,
        y = /(SmartTV|SMART-TV|Tizen(.*TV))/i,
        b = /(Sony(.*TV)|TV(.*Sony))/i,
        w = /(LG(.*NetCast))/i,
        k = /TSB(.*TV)/i,
        L = /Viera/i,
        x = /(HbbTV|Espial|NETTV|TV(.*HDMI))/i,
        T = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
        S = function(e, t) {
            return e.test(t)
        },
        E = function(e) {
            var E = e || navigator.userAgent,
                A = E.split("[FBAN");
            if (void 0 !== A[1] && (E = A[0]),
                this.apple = {
                    phone: S(t, E),
                    ipod: S(n, E),
                    tablet: !S(t, E) && S(i, E),
                    device: S(t, E) || S(n, E) || S(i, E)
                },
                this.amazon = {
                    phone: S(a, E),
                    tablet: !S(a, E) && S(s, E),
                    device: S(a, E) || S(s, E)
                },
                this.android = {
                    phone: S(a, E) || S(r, E),
                    tablet: !S(a, E) && !S(r, E) && (S(s, E) || S(o, E)),
                    device: S(a, E) || S(s, E) || S(r, E) || S(o, E)
                },
                this.windows = {
                    phone: S(c, E),
                    tablet: S(l, E),
                    device: S(c, E) || S(l, E)
                },
                this.tvu = {
                    apple: S(m, E),
                    google: S(v, E),
                    samsung: S(y, E),
                    sony: S(b, E),
                    lg: S(w, E),
                    toshiba: S(k, E),
                    panasonic: S(L, E),
                    other: S(x, E)
                },
                this.other = {
                    blackberry: S(u, E),
                    blackberry10: S(d, E),
                    opera: S(h, E),
                    firefox: S(p, E),
                    chrome: S(f, E),
                    uc: S(g, E),
                    device: S(u, E) || S(d, E) || S(h, E) || S(p, E) || S(f, E)
                },
                this.seven_inch = S(T, E),
                this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch,
                this.phone = this.apple.phone || this.android.phone || this.windows.phone,
                this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet,
                this.tv = this.tvu.apple || this.tvu.google || this.tvu.samsung || this.tvu.sony || this.tvu.lg || this.tvu.toshiba || this.tvu.panasonic || this.tvu.other,
                "undefined" == typeof window)
                return this
        },
        A = function() {
            var e = new E;
            return e.Class = E,
                e
        };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = E : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = A() : "function" == typeof define && define.amd ? define("ismobile", [], e.ismobile = A()) : e.ismobile = A()
}(this),
function() {
    "use strict";

    function e() {
        var e = {
            parent: document.body,
            version: "1.0.11",
            defaultOkLabel: "Ok",
            okLabel: "Ok",
            defaultCancelLabel: "Cancel",
            cancelLabel: "Cancel",
            defaultMaxLogItems: 2,
            maxLogItems: 2,
            promptValue: "",
            promptPlaceholder: "",
            closeLogOnClick: !1,
            closeLogOnClickDefault: !1,
            delay: 5e3,
            defaultDelay: 5e3,
            logContainerClass: "alertify-logs",
            logContainerDefaultClass: "alertify-logs",
            dialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            defaultDialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            build: function(e) {
                var t = this.dialogs.buttons.ok,
                    n = "<div class='dialog'><div>" + this.dialogs.message.replace("{{message}}", e.message);
                return "confirm" !== e.type && "prompt" !== e.type || (t = this.dialogs.buttons.cancel + this.dialogs.buttons.ok),
                    "prompt" === e.type && (n += this.dialogs.input),
                    n = (n + this.dialogs.buttons.holder + "</div></div>").replace("{{buttons}}", t).replace("{{ok}}", this.okLabel).replace("{{cancel}}", this.cancelLabel)
            },
            setCloseLogOnClick: function(e) {
                this.closeLogOnClick = !!e
            },
            close: function(e, n) {
                this.closeLogOnClick && e.addEventListener("click", function() {
                        t(e)
                    }),
                    n = n && !isNaN(+n) ? +n : this.delay,
                    0 > n ? t(e) : n > 0 && setTimeout(function() {
                        t(e)
                    }, n)
            },
            dialog: function(e, t, n, i) {
                return this.setup({
                    type: t,
                    message: e,
                    onOkay: n,
                    onCancel: i
                })
            },
            log: function(e, t, n) {
                var i = document.querySelectorAll(".alertify-logs > div");
                if (i) {
                    var r = i.length - this.maxLogItems;
                    if (r >= 0)
                        for (var o = 0, a = r + 1; a > o; o++)
                            this.close(i[o], -1)
                }
                this.notify(e, t, n)
            },
            setLogPosition: function(e) {
                this.logContainerClass = "alertify-logs " + e
            },
            setupLogContainer: function() {
                var e = document.querySelector(".alertify-logs"),
                    t = this.logContainerClass;
                return e || (e = document.createElement("div"),
                        e.className = t,
                        this.parent.appendChild(e)),
                    e.className !== t && (e.className = t),
                    e
            },
            notify: function(t, n, i) {
                var r = this.setupLogContainer(),
                    o = document.createElement("div");
                o.className = n || "default",
                    e.logTemplateMethod ? o.innerHTML = e.logTemplateMethod(t) : o.innerHTML = t,
                    "function" == typeof i && o.addEventListener("click", i),
                    r.appendChild(o),
                    setTimeout(function() {
                        o.className += " show"
                    }, 10),
                    this.close(o, this.delay)
            },
            setup: function(e) {
                function n(n) {
                    "function" != typeof n && (n = function() {}),
                        r && r.addEventListener("click", function(r) {
                            e.onOkay && "function" == typeof e.onOkay && (a ? e.onOkay(a.value, r) : e.onOkay(r)),
                                n(a ? {
                                    buttonClicked: "ok",
                                    inputValue: a.value,
                                    event: r
                                } : {
                                    buttonClicked: "ok",
                                    event: r
                                }),
                                t(i)
                        }),
                        o && o.addEventListener("click", function(r) {
                            e.onCancel && "function" == typeof e.onCancel && e.onCancel(r),
                                n({
                                    buttonClicked: "cancel",
                                    event: r
                                }),
                                t(i)
                        }),
                        a && a.addEventListener("keyup", function(e) {
                            13 === e.which && r.click()
                        })
                }
                var i = document.createElement("div");
                i.className = "alertify hide",
                    i.innerHTML = this.build(e);
                var r = i.querySelector(".ok"),
                    o = i.querySelector(".cancel"),
                    a = i.querySelector("input"),
                    s = i.querySelector("label");
                a && ("string" == typeof this.promptPlaceholder && (s ? s.textContent = this.promptPlaceholder : a.placeholder = this.promptPlaceholder),
                    "string" == typeof this.promptValue && (a.value = this.promptValue));
                var c;
                return "function" == typeof Promise ? c = new Promise(n) : n(),
                    this.parent.appendChild(i),
                    setTimeout(function() {
                        i.classList.remove("hide"),
                            a && e.type && "prompt" === e.type ? (a.select(),
                                a.focus()) : r && r.focus()
                    }, 100),
                    c
            },
            okBtn: function(e) {
                return this.okLabel = e,
                    this
            },
            setDelay: function(e) {
                return e = e || 0,
                    this.delay = isNaN(e) ? this.defaultDelay : parseInt(e, 10),
                    this
            },
            cancelBtn: function(e) {
                return this.cancelLabel = e,
                    this
            },
            setMaxLogItems: function(e) {
                this.maxLogItems = parseInt(e || this.defaultMaxLogItems)
            },
            theme: function(e) {
                switch (e.toLowerCase()) {
                    case "bootstrap":
                        this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>",
                            this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>",
                            this.dialogs.input = "<input type='text' class='form-control'>";
                        break;
                    case "purecss":
                        this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>",
                            this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                        break;
                    case "mdl":
                    case "material-design-light":
                        this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>",
                            this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>",
                            this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                        break;
                    case "angular-material":
                        this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>",
                            this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>",
                            this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                        break;
                    case "default":
                    default:
                        this.dialogs.buttons.ok = this.defaultDialogs.buttons.ok,
                            this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel,
                            this.dialogs.input = this.defaultDialogs.input
                }
            },
            reset: function() {
                this.parent = document.body,
                    this.theme("default"),
                    this.okBtn(this.defaultOkLabel),
                    this.cancelBtn(this.defaultCancelLabel),
                    this.setMaxLogItems(),
                    this.promptValue = "",
                    this.promptPlaceholder = "",
                    this.delay = this.defaultDelay,
                    this.setCloseLogOnClick(this.closeLogOnClickDefault),
                    this.setLogPosition("bottom left"),
                    this.logTemplateMethod = null
            },
            injectCSS: function() {
                if (!document.querySelector("#alertifyCSS")) {
                    var e = document.getElementsByTagName("head")[0],
                        t = document.createElement("style");
                    t.type = "text/css",
                        t.id = "alertifyCSS",
                        t.innerHTML = ".alertify-logs>*{padding:12px 24px;color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.2);border-radius:1px}.alertify-logs>*,.alertify-logs>.default{background:rgba(0,0,0,.8)}.alertify-logs>.error{background:rgba(244,67,54,.8)}.alertify-logs>.success{background:rgba(76,175,80,.9)}.alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:1}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{box-sizing:border-box;transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *{box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin-bottom:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;border:0;display:inline-block;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:1}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{box-sizing:border-box;transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;backface-visibility:hidden;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}",
                        e.insertBefore(t, e.firstChild)
                }
            },
            removeCSS: function() {
                var e = document.querySelector("#alertifyCSS");
                e && e.parentNode && e.parentNode.removeChild(e)
            }
        };
        return e.injectCSS(), {
            _$$alertify: e,
            parent: function(t) {
                e.parent = t
            },
            reset: function() {
                return e.reset(),
                    this
            },
            alert: function(t, n, i) {
                return e.dialog(t, "alert", n, i) || this
            },
            confirm: function(t, n, i) {
                return e.dialog(t, "confirm", n, i) || this
            },
            prompt: function(t, n, i) {
                return e.dialog(t, "prompt", n, i) || this
            },
            log: function(t, n) {
                return e.log(t, "default", n),
                    this
            },
            theme: function(t) {
                return e.theme(t),
                    this
            },
            success: function(t, n) {
                return e.log(t, "success", n),
                    this
            },
            error: function(t, n) {
                return e.log(t, "error", n),
                    this
            },
            cancelBtn: function(t) {
                return e.cancelBtn(t),
                    this
            },
            okBtn: function(t) {
                return e.okBtn(t),
                    this
            },
            delay: function(t) {
                return e.setDelay(t),
                    this
            },
            placeholder: function(t) {
                return e.promptPlaceholder = t,
                    this
            },
            defaultValue: function(t) {
                return e.promptValue = t,
                    this
            },
            maxLogItems: function(t) {
                return e.setMaxLogItems(t),
                    this
            },
            closeLogOnClick: function(t) {
                return e.setCloseLogOnClick(!!t),
                    this
            },
            logPosition: function(t) {
                return e.setLogPosition(t || ""),
                    this
            },
            setLogTemplate: function(t) {
                return e.logTemplateMethod = t,
                    this
            },
            clearLogs: function() {
                return e.setupLogContainer().innerHTML = "",
                    this
            },
            version: e.version
        }
    }
    var t = function(e) {
        if (e) {
            var t = function() {
                e && e.parentNode && e.parentNode.removeChild(e)
            };
            e.classList.remove("show"),
                e.classList.add("hide"),
                e.addEventListener("transitionend", t),
                setTimeout(t, 500)
        }
    };
    if ("undefined" != typeof module && module && module.exports) {
        module.exports = function() {
            return new e
        };
        var n = new e;
        for (var i in n)
            module.exports[i] = n[i]
    } else
        "function" == typeof define && define.amd ? define(function() {
            return new e
        }) : window.alertify = new e
}(),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Mark = t()
}(this, function() {
    "use strict";

    function e(t) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } :
            function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        )(t)
    }

    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function n(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
        }
    }

    function i(e, t, i) {
        return t && n(e.prototype, t),
            i && n(e, i),
            e
    }

    function r() {
        return (r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }).apply(this, arguments)
    }
    var o = function() {
            function e(n) {
                var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5e3;
                t(this, e),
                    this.ctx = n,
                    this.iframes = i,
                    this.exclude = r,
                    this.iframesTimeout = o
            }
            return i(e, [{
                    key: "getContexts",
                    value: function() {
                        var e = [];
                        return (void 0 !== this.ctx && this.ctx ? NodeList.prototype.isPrototypeOf(this.ctx) ? Array.prototype.slice.call(this.ctx) : Array.isArray(this.ctx) ? this.ctx : "string" == typeof this.ctx ? Array.prototype.slice.call(document.querySelectorAll(this.ctx)) : [this.ctx] : []).forEach(function(t) {
                                var n = e.filter(function(e) {
                                    return e.contains(t)
                                }).length > 0; -
                                1 !== e.indexOf(t) || n || e.push(t)
                            }),
                            e
                    }
                }, {
                    key: "getIframeContents",
                    value: function(e, t) {
                        var n, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
                        try {
                            var r = e.contentWindow;
                            if (n = r.document, !r || !n)
                                throw new Error("iframe inaccessible")
                        } catch (e) {
                            i()
                        }
                        n && t(n)
                    }
                }, {
                    key: "isIframeBlank",
                    value: function(e) {
                        var t = "about:blank",
                            n = e.getAttribute("src").trim();
                        return e.contentWindow.location.href === t && n !== t && n
                    }
                }, {
                    key: "observeIframeLoad",
                    value: function(e, t, n) {
                        var i = this,
                            r = !1,
                            o = null,
                            a = function a() {
                                if (!r) {
                                    r = !0,
                                        clearTimeout(o);
                                    try {
                                        i.isIframeBlank(e) || (e.removeEventListener("load", a),
                                            i.getIframeContents(e, t, n))
                                    } catch (e) {
                                        n()
                                    }
                                }
                            };
                        e.addEventListener("load", a),
                            o = setTimeout(a, this.iframesTimeout)
                    }
                }, {
                    key: "onIframeReady",
                    value: function(e, t, n) {
                        try {
                            "complete" === e.contentWindow.document.readyState ? this.isIframeBlank(e) ? this.observeIframeLoad(e, t, n) : this.getIframeContents(e, t, n) : this.observeIframeLoad(e, t, n)
                        } catch (e) {
                            n()
                        }
                    }
                }, {
                    key: "waitForIframes",
                    value: function(e, t) {
                        var n = this,
                            i = 0;
                        this.forEachIframe(e, function() {
                            return !0
                        }, function(e) {
                            i++,
                            n.waitForIframes(e.querySelector("html"), function() {
                                --i || t()
                            })
                        }, function(e) {
                            e || t()
                        })
                    }
                }, {
                    key: "forEachIframe",
                    value: function(t, n, i) {
                        var r = this,
                            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {},
                            a = t.querySelectorAll("iframe"),
                            s = a.length,
                            c = 0;
                        a = Array.prototype.slice.call(a);
                        var l = function() {
                            --s <= 0 && o(c)
                        };
                        s || l(),
                            a.forEach(function(t) {
                                e.matches(t, r.exclude) ? l() : r.onIframeReady(t, function(e) {
                                    n(t) && (c++,
                                            i(e)),
                                        l()
                                }, l)
                            })
                    }
                }, {
                    key: "createIterator",
                    value: function(e, t, n) {
                        return document.createNodeIterator(e, t, n, !1)
                    }
                }, {
                    key: "createInstanceOnIframe",
                    value: function(t) {
                        return new e(t.querySelector("html"), this.iframes)
                    }
                }, {
                    key: "compareNodeIframe",
                    value: function(e, t, n) {
                        if (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) {
                            if (null === t)
                                return !0;
                            if (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)
                                return !0
                        }
                        return !1
                    }
                }, {
                    key: "getIteratorNode",
                    value: function(e) {
                        var t = e.previousNode();
                        return {
                            prevNode: t,
                            node: null === t ? e.nextNode() : e.nextNode() && e.nextNode()
                        }
                    }
                }, {
                    key: "checkIframeFilter",
                    value: function(e, t, n, i) {
                        var r = !1,
                            o = !1;
                        return i.forEach(function(e, t) {
                                e.val === n && (r = t,
                                    o = e.handled)
                            }),
                            this.compareNodeIframe(e, t, n) ? (!1 !== r || o ? !1 === r || o || (i[r].handled = !0) : i.push({
                                val: n,
                                handled: !0
                            }), !0) : (!1 === r && i.push({
                                val: n,
                                handled: !1
                            }), !1)
                    }
                }, {
                    key: "handleOpenIframes",
                    value: function(e, t, n, i) {
                        var r = this;
                        e.forEach(function(e) {
                            e.handled || r.getIframeContents(e.val, function(e) {
                                r.createInstanceOnIframe(e).forEachNode(t, n, i)
                            })
                        })
                    }
                }, {
                    key: "iterateThroughNodes",
                    value: function(e, t, n, i, r) {
                        for (var o, a, s, c = this, l = this.createIterator(t, e, i), u = [], d = []; s = void 0,
                            s = c.getIteratorNode(l),
                            a = s.prevNode,
                            o = s.node;)
                            this.iframes && this.forEachIframe(t, function(e) {
                                return c.checkIframeFilter(o, a, e, u)
                            }, function(t) {
                                c.createInstanceOnIframe(t).forEachNode(e, function(e) {
                                    return d.push(e)
                                }, i)
                            }),
                            d.push(o);
                        d.forEach(function(e) {
                                n(e)
                            }),
                            this.iframes && this.handleOpenIframes(u, e, n, i),
                            r()
                    }
                }, {
                    key: "forEachNode",
                    value: function(e, t, n) {
                        var i = this,
                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {},
                            o = this.getContexts(),
                            a = o.length;
                        a || r(),
                            o.forEach(function(o) {
                                var s = function() {
                                    i.iterateThroughNodes(e, o, t, n, function() {
                                        --a <= 0 && r()
                                    })
                                };
                                i.iframes ? i.waitForIframes(o, s) : s()
                            })
                    }
                }], [{
                    key: "matches",
                    value: function(e, t) {
                        var n = "string" == typeof t ? [t] : t,
                            i = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
                        if (i) {
                            var r = !1;
                            return n.every(function(t) {
                                    return !i.call(e, t) || (r = !0, !1)
                                }),
                                r
                        }
                        return !1
                    }
                }]),
                e
        }(),
        a = function() {
            function e(n) {
                t(this, e),
                    this.opt = r({}, {
                        diacritics: !0,
                        synonyms: {},
                        accuracy: "partially",
                        caseSensitive: !1,
                        ignoreJoiners: !1,
                        ignorePunctuation: [],
                        wildcards: "disabled"
                    }, n)
            }
            return i(e, [{
                    key: "create",
                    value: function(e) {
                        return "disabled" !== this.opt.wildcards && (e = this.setupWildcardsRegExp(e)),
                            e = this.escapeStr(e),
                            Object.keys(this.opt.synonyms).length && (e = this.createSynonymsRegExp(e)),
                            (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)),
                            this.opt.diacritics && (e = this.createDiacriticsRegExp(e)),
                            e = this.createMergedBlanksRegExp(e),
                            (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.createJoinersRegExp(e)),
                            "disabled" !== this.opt.wildcards && (e = this.createWildcardsRegExp(e)),
                            e = this.createAccuracyRegExp(e),
                            new RegExp(e, "gm".concat(this.opt.caseSensitive ? "" : "i"))
                    }
                }, {
                    key: "sortByLength",
                    value: function(e) {
                        return e.sort(function(e, t) {
                            return e.length === t.length ? e > t ? 1 : -1 : t.length - e.length
                        })
                    }
                }, {
                    key: "escapeStr",
                    value: function(e) {
                        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                    }
                }, {
                    key: "createSynonymsRegExp",
                    value: function(e) {
                        var t = this,
                            n = this.opt.synonyms,
                            i = this.opt.caseSensitive ? "" : "i",
                            r = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                var a = Array.isArray(n[o]) ? n[o] : [n[o]];
                                a.unshift(o),
                                    (a = this.sortByLength(a).map(function(e) {
                                        return "disabled" !== t.opt.wildcards && (e = t.setupWildcardsRegExp(e)),
                                            e = t.escapeStr(e)
                                    }).filter(function(e) {
                                        return "" !== e
                                    })).length > 1 && (e = e.replace(new RegExp("(".concat(a.map(function(e) {
                                        return t.escapeStr(e)
                                    }).join("|"), ")"), "gm".concat(i)), r + "(".concat(a.map(function(e) {
                                        return t.processSynonyms(e)
                                    }).join("|"), ")") + r))
                            }
                        return e
                    }
                }, {
                    key: "processSynonyms",
                    value: function(e) {
                        return (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)),
                            e
                    }
                }, {
                    key: "setupWildcardsRegExp",
                    value: function(e) {
                        return (e = e.replace(/(?:\\)*\?/g, function(e) {
                            return "\\" === e.charAt(0) ? "?" : ""
                        })).replace(/(?:\\)*\*/g, function(e) {
                            return "\\" === e.charAt(0) ? "*" : ""
                        })
                    }
                }, {
                    key: "createWildcardsRegExp",
                    value: function(e) {
                        var t = "withSpaces" === this.opt.wildcards;
                        return e.replace(/\u0001/g, t ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, t ? "[\\S\\s]*?" : "\\S*")
                    }
                }, {
                    key: "setupIgnoreJoinersRegExp",
                    value: function(e) {
                        return e.replace(/[^(|)\\]/g, function(e, t, n) {
                            var i = n.charAt(t + 1);
                            return /[(|)\\]/.test(i) || "" === i ? e : e + "\0"
                        })
                    }
                }, {
                    key: "createJoinersRegExp",
                    value: function(e) {
                        var t = [],
                            n = this.opt.ignorePunctuation;
                        return Array.isArray(n) && n.length && t.push(this.escapeStr(n.join(""))),
                            this.opt.ignoreJoiners && t.push("\\u00ad\\u200b\\u200c\\u200d"),
                            t.length ? e.split(/\u0000+/).join("[".concat(t.join(""), "]*")) : e
                    }
                }, {
                    key: "createDiacriticsRegExp",
                    value: function(e) {
                        var t = this.opt.caseSensitive ? "" : "i",
                            n = this.opt.caseSensitive ? ["aàáảãạăằắẳẵặâầấẩẫậäåāą", "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéẻẽẹêềếểễệëěēę", "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïī", "IÌÍỈĨỊÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøō", "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rř", "RŘ", "sšśșş", "SŠŚȘŞ", "tťțţ", "TŤȚŢ", "uùúủũụưừứửữựûüůū", "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿ", "YÝỲỶỸỴŸ", "zžżź", "ZŽŻŹ"] : ["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćčCÇĆČ", "dđďDĐĎ", "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ", "lłLŁ", "nñňńNÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rřRŘ", "sšśșşSŠŚȘŞ", "tťțţTŤȚŢ", "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿYÝỲỶỸỴŸ", "zžżźZŽŻŹ"],
                            i = [];
                        return e.split("").forEach(function(r) {
                                n.every(function(n) {
                                    if (-1 !== n.indexOf(r)) {
                                        if (i.indexOf(n) > -1)
                                            return !1;
                                        e = e.replace(new RegExp("[".concat(n, "]"), "gm".concat(t)), "[".concat(n, "]")),
                                            i.push(n)
                                    }
                                    return !0
                                })
                            }),
                            e
                    }
                }, {
                    key: "createMergedBlanksRegExp",
                    value: function(e) {
                        return e.replace(/[\s]+/gim, "[\\s]+")
                    }
                }, {
                    key: "createAccuracyRegExp",
                    value: function(e) {
                        var t = this,
                            n = this.opt.accuracy,
                            i = "string" == typeof n ? n : n.value,
                            r = "string" == typeof n ? [] : n.limiters,
                            o = "";
                        switch (r.forEach(function(e) {
                                o += "|".concat(t.escapeStr(e))
                            }),
                            i) {
                            case "partially":
                            default:
                                return "()(".concat(e, ")");
                            case "complementary":
                                return o = "\\s" + (o || this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")),
                                    "()([^".concat(o, "]*").concat(e, "[^").concat(o, "]*)");
                            case "exactly":
                                return "(^|\\s".concat(o, ")(").concat(e, ")(?=$|\\s").concat(o, ")")
                        }
                    }
                }]),
                e
        }(),
        s = function() {
            function n(e) {
                t(this, n),
                    this.ctx = e,
                    this.ie = !1;
                var i = window.navigator.userAgent;
                (i.indexOf("MSIE") > -1 || i.indexOf("Trident") > -1) && (this.ie = !0)
            }
            return i(n, [{
                    key: "log",
                    value: function(t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "debug",
                            i = this.opt.log;
                        this.opt.debug && "object" === e(i) && "function" == typeof i[n] && i[n]("mark.js: ".concat(t))
                    }
                }, {
                    key: "getSeparatedKeywords",
                    value: function(e) {
                        var t = this,
                            n = [];
                        return e.forEach(function(e) {
                            t.opt.separateWordSearch ? e.split(" ").forEach(function(e) {
                                e.trim() && -1 === n.indexOf(e) && n.push(e)
                            }) : e.trim() && -1 === n.indexOf(e) && n.push(e)
                        }), {
                            keywords: n.sort(function(e, t) {
                                return t.length - e.length
                            }),
                            length: n.length
                        }
                    }
                }, {
                    key: "isNumeric",
                    value: function(e) {
                        return Number(parseFloat(e)) == e
                    }
                }, {
                    key: "checkRanges",
                    value: function(e) {
                        var t = this;
                        if (!Array.isArray(e) || "[object Object]" !== Object.prototype.toString.call(e[0]))
                            return this.log("markRanges() will only accept an array of objects"),
                                this.opt.noMatch(e), [];
                        var n = [],
                            i = 0;
                        return e.sort(function(e, t) {
                                return e.start - t.start
                            }).forEach(function(e) {
                                var r = t.callNoMatchOnInvalidRanges(e, i),
                                    o = r.start,
                                    a = r.end;
                                r.valid && (e.start = o,
                                    e.length = a - o,
                                    n.push(e),
                                    i = a)
                            }),
                            n
                    }
                }, {
                    key: "callNoMatchOnInvalidRanges",
                    value: function(e, t) {
                        var n, i, r = !1;
                        return e && void 0 !== e.start ? (i = (n = parseInt(e.start, 10)) + parseInt(e.length, 10),
                            this.isNumeric(e.start) && this.isNumeric(e.length) && i - t > 0 && i - n > 0 ? r = !0 : (this.log("Ignoring invalid or overlapping range: " + "".concat(JSON.stringify(e))),
                                this.opt.noMatch(e))) : (this.log("Ignoring invalid range: ".concat(JSON.stringify(e))),
                            this.opt.noMatch(e)), {
                            start: n,
                            end: i,
                            valid: r
                        }
                    }
                }, {
                    key: "checkWhitespaceRanges",
                    value: function(e, t, n) {
                        var i, r = !0,
                            o = n.length,
                            a = t - o,
                            s = parseInt(e.start, 10) - a;
                        return (i = (s = s > o ? o : s) + parseInt(e.length, 10)) > o && (i = o,
                                this.log("End range automatically set to the max value of ".concat(o))),
                            s < 0 || i - s < 0 || s > o || i > o ? (r = !1,
                                this.log("Invalid range: ".concat(JSON.stringify(e))),
                                this.opt.noMatch(e)) : "" === n.substring(s, i).replace(/\s+/g, "") && (r = !1,
                                this.log("Skipping whitespace only range: " + JSON.stringify(e)),
                                this.opt.noMatch(e)), {
                                start: s,
                                end: i,
                                valid: r
                            }
                    }
                }, {
                    key: "getTextNodes",
                    value: function(e) {
                        var t = this,
                            n = "",
                            i = [];
                        this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function(e) {
                            i.push({
                                start: n.length,
                                end: (n += e.textContent).length,
                                node: e
                            })
                        }, function(e) {
                            return t.matchesExclude(e.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                        }, function() {
                            e({
                                value: n,
                                nodes: i
                            })
                        })
                    }
                }, {
                    key: "matchesExclude",
                    value: function(e) {
                        return o.matches(e, this.opt.exclude.concat(["script", "style", "title", "head", "html"]))
                    }
                }, {
                    key: "wrapRangeInTextNode",
                    value: function(e, t, n) {
                        var i = this.opt.element ? this.opt.element : "mark",
                            r = e.splitText(t),
                            o = r.splitText(n - t),
                            a = document.createElement(i);
                        return a.setAttribute("data-markjs", "true"),
                            this.opt.className && a.setAttribute("class", this.opt.className),
                            a.textContent = r.textContent,
                            r.parentNode.replaceChild(a, r),
                            o
                    }
                }, {
                    key: "wrapRangeInMappedTextNode",
                    value: function(e, t, n, i, r) {
                        var o = this;
                        e.nodes.every(function(a, s) {
                            var c = e.nodes[s + 1];
                            if (void 0 === c || c.start > t) {
                                if (!i(a.node))
                                    return !1;
                                var l = t - a.start,
                                    u = (n > a.end ? a.end : n) - a.start,
                                    d = e.value.substr(0, a.start),
                                    h = e.value.substr(u + a.start);
                                if (a.node = o.wrapRangeInTextNode(a.node, l, u),
                                    e.value = d + h,
                                    e.nodes.forEach(function(t, n) {
                                        n >= s && (e.nodes[n].start > 0 && n !== s && (e.nodes[n].start -= u),
                                            e.nodes[n].end -= u)
                                    }),
                                    n -= u,
                                    r(a.node.previousSibling, a.start), !(n > a.end))
                                    return !1;
                                t = a.end
                            }
                            return !0
                        })
                    }
                }, {
                    key: "wrapGroups",
                    value: function(e, t, n, i) {
                        return i((e = this.wrapRangeInTextNode(e, t, t + n)).previousSibling),
                            e
                    }
                }, {
                    key: "separateGroups",
                    value: function(e, t, n, i, r) {
                        for (var o = t.length, a = 1; a < o; a++) {
                            var s = e.textContent.indexOf(t[a]);
                            t[a] && s > -1 && i(t[a], e) && (e = this.wrapGroups(e, s, t[a].length, r))
                        }
                        return e
                    }
                }, {
                    key: "wrapMatches",
                    value: function(e, t, n, i, r) {
                        var o = this,
                            a = 0 === t ? 0 : t + 1;
                        this.getTextNodes(function(t) {
                            t.nodes.forEach(function(t) {
                                    var r;
                                    for (t = t.node; null !== (r = e.exec(t.textContent)) && "" !== r[a];) {
                                        if (o.opt.separateGroups)
                                            t = o.separateGroups(t, r, a, n, i);
                                        else {
                                            if (!n(r[a], t))
                                                continue;
                                            var s = r.index;
                                            if (0 !== a)
                                                for (var c = 1; c < a; c++)
                                                    s += r[c].length;
                                            t = o.wrapGroups(t, s, r[a].length, i)
                                        }
                                        e.lastIndex = 0
                                    }
                                }),
                                r()
                        })
                    }
                }, {
                    key: "wrapMatchesAcrossElements",
                    value: function(e, t, n, i, r) {
                        var o = this,
                            a = 0 === t ? 0 : t + 1;
                        this.getTextNodes(function(t) {
                            for (var s; null !== (s = e.exec(t.value)) && "" !== s[a];) {
                                var c = s.index;
                                if (0 !== a)
                                    for (var l = 1; l < a; l++)
                                        c += s[l].length;
                                var u = c + s[a].length;
                                o.wrapRangeInMappedTextNode(t, c, u, function(e) {
                                    return n(s[a], e)
                                }, function(t, n) {
                                    e.lastIndex = n,
                                        i(t)
                                })
                            }
                            r()
                        })
                    }
                }, {
                    key: "wrapRangeFromIndex",
                    value: function(e, t, n, i) {
                        var r = this;
                        this.getTextNodes(function(o) {
                            var a = o.value.length;
                            e.forEach(function(e, i) {
                                    var s = r.checkWhitespaceRanges(e, a, o.value),
                                        c = s.start,
                                        l = s.end;
                                    s.valid && r.wrapRangeInMappedTextNode(o, c, l, function(n) {
                                        return t(n, e, o.value.substring(c, l), i)
                                    }, function(t) {
                                        n(t, e)
                                    })
                                }),
                                i()
                        })
                    }
                }, {
                    key: "unwrapMatches",
                    value: function(e) {
                        for (var t = e.parentNode, n = document.createDocumentFragment(); e.firstChild;)
                            n.appendChild(e.removeChild(e.firstChild));
                        t.replaceChild(n, e),
                            this.ie ? this.normalizeTextNode(t) : t.normalize()
                    }
                }, {
                    key: "normalizeTextNode",
                    value: function(e) {
                        if (e) {
                            if (3 === e.nodeType)
                                for (; e.nextSibling && 3 === e.nextSibling.nodeType;)
                                    e.nodeValue += e.nextSibling.nodeValue,
                                    e.parentNode.removeChild(e.nextSibling);
                            else
                                this.normalizeTextNode(e.firstChild);
                            this.normalizeTextNode(e.nextSibling)
                        }
                    }
                }, {
                    key: "markRegExp",
                    value: function(e, t) {
                        var n = this;
                        this.opt = t,
                            this.log('Searching with expression "'.concat(e, '"'));
                        var i = 0,
                            r = "wrapMatches";
                        this.opt.acrossElements && (r = "wrapMatchesAcrossElements"),
                            this[r](e, this.opt.ignoreGroups, function(e, t) {
                                return n.opt.filter(t, e, i)
                            }, function(e) {
                                i++,
                                n.opt.each(e)
                            }, function() {
                                0 === i && n.opt.noMatch(e),
                                    n.opt.done(i)
                            })
                    }
                }, {
                    key: "mark",
                    value: function(e, t) {
                        var n = this;
                        this.opt = t;
                        var i = 0,
                            r = "wrapMatches",
                            o = this.getSeparatedKeywords("string" == typeof e ? [e] : e),
                            s = o.keywords,
                            c = o.length;
                        this.opt.acrossElements && (r = "wrapMatchesAcrossElements"),
                            0 === c ? this.opt.done(i) : function e(t) {
                                var o = new a(n.opt).create(t),
                                    l = 0;
                                n.log('Searching with expression "'.concat(o, '"')),
                                    n[r](o, 1, function(e, r) {
                                        return n.opt.filter(r, t, i, l)
                                    }, function(e) {
                                        l++,
                                        i++,
                                        n.opt.each(e)
                                    }, function() {
                                        0 === l && n.opt.noMatch(t),
                                            s[c - 1] === t ? n.opt.done(i) : e(s[s.indexOf(t) + 1])
                                    })
                            }(s[0])
                    }
                }, {
                    key: "markRanges",
                    value: function(e, t) {
                        var n = this;
                        this.opt = t;
                        var i = 0,
                            r = this.checkRanges(e);
                        r && r.length ? (this.log("Starting to mark with the following ranges: " + JSON.stringify(r)),
                            this.wrapRangeFromIndex(r, function(e, t, i, r) {
                                return n.opt.filter(e, t, i, r)
                            }, function(e, t) {
                                i++,
                                n.opt.each(e, t)
                            }, function() {
                                n.opt.done(i)
                            })) : this.opt.done(i)
                    }
                }, {
                    key: "unmark",
                    value: function(e) {
                        var t = this;
                        this.opt = e;
                        var n = this.opt.element ? this.opt.element : "*";
                        n += "[data-markjs]",
                            this.opt.className && (n += ".".concat(this.opt.className)),
                            this.log('Removal selector "'.concat(n, '"')),
                            this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function(e) {
                                t.unwrapMatches(e)
                            }, function(e) {
                                var i = o.matches(e, n),
                                    r = t.matchesExclude(e);
                                return !i || r ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                            }, this.opt.done)
                    }
                }, {
                    key: "opt",
                    set: function(e) {
                        this._opt = r({}, {
                            element: "",
                            className: "",
                            exclude: [],
                            iframes: !1,
                            iframesTimeout: 5e3,
                            separateWordSearch: !0,
                            acrossElements: !1,
                            ignoreGroups: 0,
                            each: function() {},
                            noMatch: function() {},
                            filter: function() {
                                return !0
                            },
                            done: function() {},
                            debug: !1,
                            log: window.console
                        }, e)
                    },
                    get: function() {
                        return this._opt
                    }
                }, {
                    key: "iterator",
                    get: function() {
                        return new o(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout)
                    }
                }]),
                n
        }();
    return function(e) {
        var t = this,
            n = new s(e);
        return this.mark = function(e, i) {
                return n.mark(e, i),
                    t
            },
            this.markRegExp = function(e, i) {
                return n.markRegExp(e, i),
                    t
            },
            this.markRanges = function(e, i) {
                return n.markRanges(e, i),
                    t
            },
            this.unmark = function(e) {
                return n.unmark(e),
                    t
            },
            this
    }
}),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.io = t() : e.io = t()
}(this, function() {
    return function(e) {
        function t(i) {
            if (n[i])
                return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(r.exports, r, r.exports, t),
                r.loaded = !0,
                r.exports
        }
        var n = {};
        return t.m = e,
            t.c = n,
            t.p = "",
            t(0)
    }([function(e, t, n) {
        function i(e, t) {
            "object" == typeof e && (t = e,
                    e = void 0),
                t = t || {};
            var n, i = r(e),
                o = i.source,
                l = i.id,
                u = i.path,
                d = c[l] && u in c[l].nsps;
            return t.forceNew || t["force new connection"] || !1 === t.multiplex || d ? (s("ignoring socket cache for %s", o),
                    n = a(o, t)) : (c[l] || (s("new io instance for %s", o),
                        c[l] = a(o, t)),
                    n = c[l]),
                i.query && !t.query && (t.query = i.query),
                n.socket(i.path, t)
        }
        var r = n(1),
            o = n(7),
            a = n(12),
            s = n(3)("socket.io-client");
        e.exports = t = i;
        var c = t.managers = {};
        t.protocol = o.protocol,
            t.connect = i,
            t.Manager = n(12),
            t.Socket = n(37)
    }, function(e, t, n) {
        function i(e, t) {
            var n = e;
            t = t || "undefined" != typeof location && location,
                null == e && (e = t.protocol + "//" + t.host),
                "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e),
                    /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e),
                        e = void 0 !== t ? t.protocol + "//" + e : "https://" + e),
                    o("parse %s", e),
                    n = r(e)),
                n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
                n.path = n.path || "/";
            var i = -1 !== n.host.indexOf(":"),
                a = i ? "[" + n.host + "]" : n.host;
            return n.id = n.protocol + "://" + a + ":" + n.port,
                n.href = n.protocol + "://" + a + (t && t.port === n.port ? "" : ":" + n.port),
                n
        }
        var r = n(2),
            o = n(3)("socket.io-client:url");
        e.exports = i
    }, function(e, t) {
        function n(e, t) {
            var n = /\/{2,9}/g,
                i = t.replace(n, "/").split("/");
            return "/" != t.substr(0, 1) && 0 !== t.length || i.splice(0, 1),
                "/" == t.substr(t.length - 1, 1) && i.splice(i.length - 1, 1),
                i
        }

        function i(e, t) {
            var n = {};
            return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(e, t, i) {
                    t && (n[t] = i)
                }),
                n
        }
        var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        e.exports = function(e) {
            var t = e,
                a = e.indexOf("["),
                s = e.indexOf("]"); -
            1 != a && -1 != s && (e = e.substring(0, a) + e.substring(a, s).replace(/:/g, ";") + e.substring(s, e.length));
            for (var c = r.exec(e || ""), l = {}, u = 14; u--;)
                l[o[u]] = c[u] || "";
            return -1 != a && -1 != s && (l.source = t,
                    l.host = l.host.substring(1, l.host.length - 1).replace(/;/g, ":"),
                    l.authority = l.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
                    l.ipv6uri = !0),
                l.pathNames = n(l, l.path),
                l.queryKey = i(l, l.query),
                l
        }
    }, function(e, t, n) {
        (function(i) {
            "use strict";

            function r() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }

            function o(e) {
                var n = this.useColors;
                if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff),
                    n) {
                    var i = "color: " + this.color;
                    e.splice(1, 0, i, "color: inherit");
                    var r = 0,
                        o = 0;
                    e[0].replace(/%[a-zA-Z%]/g, function(e) {
                            "%%" !== e && (r++,
                                "%c" === e && (o = r))
                        }),
                        e.splice(o, 0, i)
                }
            }

            function a() {
                return "object" === ("undefined" == typeof console ? "undefined" : l(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function s(e) {
                try {
                    null == e ? t.storage.removeItem("debug") : t.storage.debug = e
                } catch (e) {}
            }

            function c() {
                var e;
                try {
                    e = t.storage.debug
                } catch (e) {}
                return !e && void 0 !== i && "env" in i && (e = i.env.DEBUG),
                    e
            }
            var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } :
                function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                };
            t = e.exports = n(5),
                t.log = a,
                t.formatArgs = o,
                t.save = s,
                t.load = c,
                t.useColors = r,
                t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                    try {
                        return window.localStorage
                    } catch (e) {}
                }(),
                t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
                t.formatters.j = function(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                },
                t.enable(c())
        }).call(t, n(4))
    }, function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function i() {
            throw new Error("clearTimeout has not been defined")
        }

        function r(e) {
            if (u === setTimeout)
                return setTimeout(e, 0);
            if ((u === n || !u) && setTimeout)
                return u = setTimeout,
                    setTimeout(e, 0);
            try {
                return u(e, 0)
            } catch (t) {
                try {
                    return u.call(null, e, 0)
                } catch (t) {
                    return u.call(this, e, 0)
                }
            }
        }

        function o(e) {
            if (d === clearTimeout)
                return clearTimeout(e);
            if ((d === i || !d) && clearTimeout)
                return d = clearTimeout,
                    clearTimeout(e);
            try {
                return d(e)
            } catch (t) {
                try {
                    return d.call(null, e)
                } catch (t) {
                    return d.call(this, e)
                }
            }
        }

        function a() {
            g && f && (g = !1,
                f.length ? p = f.concat(p) : m = -1,
                p.length && s())
        }

        function s() {
            if (!g) {
                var e = r(a);
                g = !0;
                for (var t = p.length; t;) {
                    for (f = p,
                        p = []; ++m < t;)
                        f && f[m].run();
                    m = -1,
                        t = p.length
                }
                f = null,
                    g = !1,
                    o(e)
            }
        }

        function c(e, t) {
            this.fun = e,
                this.array = t
        }

        function l() {}
        var u, d, h = e.exports = {};
        ! function() {
            try {
                u = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                u = n
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : i
            } catch (e) {
                d = i
            }
        }();
        var f, p = [],
            g = !1,
            m = -1;
        h.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                p.push(new c(e, t)),
                    1 !== p.length || g || r(s)
            },
            c.prototype.run = function() {
                this.fun.apply(null, this.array)
            },
            h.title = "browser",
            h.browser = !0,
            h.env = {},
            h.argv = [],
            h.version = "",
            h.versions = {},
            h.on = l,
            h.addListener = l,
            h.once = l,
            h.off = l,
            h.removeListener = l,
            h.removeAllListeners = l,
            h.emit = l,
            h.prependListener = l,
            h.prependOnceListener = l,
            h.listeners = function(e) {
                return []
            },
            h.binding = function(e) {
                throw new Error("process.binding is not supported")
            },
            h.cwd = function() {
                return "/"
            },
            h.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            },
            h.umask = function() {
                return 0
            }
    }, function(e, t, n) {
        "use strict";

        function i(e) {
            var n, i = 0;
            for (n in e)
                i = (i << 5) - i + e.charCodeAt(n),
                i |= 0;
            return t.colors[Math.abs(i) % t.colors.length]
        }

        function r(e) {
            function n() {
                if (n.enabled) {
                    var e = n,
                        i = +new Date,
                        o = i - (r || i);
                    e.diff = o,
                        e.prev = r,
                        e.curr = i,
                        r = i;
                    for (var a = new Array(arguments.length), s = 0; s < a.length; s++)
                        a[s] = arguments[s];
                    a[0] = t.coerce(a[0]),
                        "string" != typeof a[0] && a.unshift("%O");
                    var c = 0;
                    a[0] = a[0].replace(/%([a-zA-Z%])/g, function(n, i) {
                            if ("%%" === n)
                                return n;
                            c++;
                            var r = t.formatters[i];
                            if ("function" == typeof r) {
                                var o = a[c];
                                n = r.call(e, o),
                                    a.splice(c, 1),
                                    c--
                            }
                            return n
                        }),
                        t.formatArgs.call(e, a);
                    (n.log || t.log || console.log.bind(console)).apply(e, a)
                }
            }
            var r;
            return n.namespace = e,
                n.enabled = t.enabled(e),
                n.useColors = t.useColors(),
                n.color = i(e),
                n.destroy = o,
                "function" == typeof t.init && t.init(n),
                t.instances.push(n),
                n
        }

        function o() {
            var e = t.instances.indexOf(this);
            return -1 !== e && (t.instances.splice(e, 1), !0)
        }

        function a(e) {
            t.save(e),
                t.names = [],
                t.skips = [];
            var n, i = ("string" == typeof e ? e : "").split(/[\s,]+/),
                r = i.length;
            for (n = 0; n < r; n++)
                i[n] && (e = i[n].replace(/\*/g, ".*?"),
                    "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var o = t.instances[n];
                o.enabled = t.enabled(o.namespace)
            }
        }

        function s() {
            t.enable("")
        }

        function c(e) {
            if ("*" === e[e.length - 1])
                return !0;
            var n, i;
            for (n = 0,
                i = t.skips.length; n < i; n++)
                if (t.skips[n].test(e))
                    return !1;
            for (n = 0,
                i = t.names.length; n < i; n++)
                if (t.names[n].test(e))
                    return !0;
            return !1
        }

        function l(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        t = e.exports = r.debug = r.default = r,
            t.coerce = l,
            t.disable = s,
            t.enable = a,
            t.enabled = c,
            t.humanize = n(6),
            t.instances = [],
            t.names = [],
            t.skips = [],
            t.formatters = {}
    }, function(e, t) {
        function n(e) {
            if (e = String(e), !(e.length > 100)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * u;
                        case "days":
                        case "day":
                        case "d":
                            return n * l;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * c;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * s;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * a;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n;
                        default:
                            return
                    }
                }
            }
        }

        function i(e) {
            return e >= l ? Math.round(e / l) + "d" : e >= c ? Math.round(e / c) + "h" : e >= s ? Math.round(e / s) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
        }

        function r(e) {
            return o(e, l, "day") || o(e, c, "hour") || o(e, s, "minute") || o(e, a, "second") || e + " ms"
        }

        function o(e, t, n) {
            if (!(e < t))
                return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        var a = 1e3,
            s = 60 * a,
            c = 60 * s,
            l = 24 * c,
            u = 365.25 * l;
        e.exports = function(e, t) {
            t = t || {};
            var o = typeof e;
            if ("string" === o && e.length > 0)
                return n(e);
            if ("number" === o && !1 === isNaN(e))
                return t.long ? r(e) : i(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }, function(e, t, n) {
        function i() {}

        function r(e) {
            var n = "" + e.type;
            if (t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-"),
                e.nsp && "/" !== e.nsp && (n += e.nsp + ","),
                null != e.id && (n += e.id),
                null != e.data) {
                var i = o(e.data);
                if (!1 === i)
                    return v;
                n += i
            }
            return h("encoded %j as %s", e, n),
                n
        }

        function o(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return !1
            }
        }

        function a(e, t) {
            function n(e) {
                var n = p.deconstructPacket(e),
                    i = r(n.packet),
                    o = n.buffers;
                o.unshift(i),
                    t(o)
            }
            p.removeBlobs(e, n)
        }

        function s() {
            this.reconstructor = null
        }

        function c(e) {
            var n = 0,
                i = {
                    type: Number(e.charAt(0))
                };
            if (null == t.types[i.type])
                return d("unknown packet type " + i.type);
            if (t.BINARY_EVENT === i.type || t.BINARY_ACK === i.type) {
                for (var r = "";
                    "-" !== e.charAt(++n) && (r += e.charAt(n),
                        n != e.length);)
                ;
                if (r != Number(r) || "-" !== e.charAt(n))
                    throw new Error("Illegal attachments");
                i.attachments = Number(r)
            }
            if ("/" === e.charAt(n + 1))
                for (i.nsp = ""; ++n;) {
                    var o = e.charAt(n);
                    if ("," === o)
                        break;
                    if (i.nsp += o,
                        n === e.length)
                        break
                }
            else
                i.nsp = "/";
            var a = e.charAt(n + 1);
            if ("" !== a && Number(a) == a) {
                for (i.id = ""; ++n;) {
                    var o = e.charAt(n);
                    if (null == o || Number(o) != o) {
                        --n;
                        break
                    }
                    if (i.id += e.charAt(n),
                        n === e.length)
                        break
                }
                i.id = Number(i.id)
            }
            if (e.charAt(++n)) {
                var s = l(e.substr(n));
                if (!(!1 !== s && (i.type === t.ERROR || g(s))))
                    return d("invalid payload");
                i.data = s
            }
            return h("decoded %s as %j", e, i),
                i
        }

        function l(e) {
            try {
                return JSON.parse(e)
            } catch (e) {
                return !1
            }
        }

        function u(e) {
            this.reconPack = e,
                this.buffers = []
        }

        function d(e) {
            return {
                type: t.ERROR,
                data: "parser error: " + e
            }
        }
        var h = n(3)("socket.io-parser"),
            f = n(8),
            p = n(9),
            g = n(10),
            m = n(11);
        t.protocol = 4,
            t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
            t.CONNECT = 0,
            t.DISCONNECT = 1,
            t.EVENT = 2,
            t.ACK = 3,
            t.ERROR = 4,
            t.BINARY_EVENT = 5,
            t.BINARY_ACK = 6,
            t.Encoder = i,
            t.Decoder = s;
        var v = t.ERROR + '"encode error"';
        i.prototype.encode = function(e, n) {
                if (h("encoding packet %j", e),
                    t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type)
                    a(e, n);
                else {
                    n([r(e)])
                }
            },
            f(s.prototype),
            s.prototype.add = function(e) {
                var n;
                if ("string" == typeof e)
                    n = c(e),
                    t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type ? (this.reconstructor = new u(n),
                        0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
                else {
                    if (!m(e) && !e.base64)
                        throw new Error("Unknown type: " + e);
                    if (!this.reconstructor)
                        throw new Error("got binary data when not reconstructing a packet");
                    (n = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null,
                        this.emit("decoded", n))
                }
            },
            s.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            },
            u.prototype.takeBinaryData = function(e) {
                if (this.buffers.push(e),
                    this.buffers.length === this.reconPack.attachments) {
                    var t = p.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(),
                        t
                }
                return null
            },
            u.prototype.finishedReconstruction = function() {
                this.reconPack = null,
                    this.buffers = []
            }
    }, function(e, t, n) {
        function i(e) {
            if (e)
                return r(e)
        }

        function r(e) {
            for (var t in i.prototype)
                e[t] = i.prototype[t];
            return e
        }
        e.exports = i,
            i.prototype.on = i.prototype.addEventListener = function(e, t) {
                return this._callbacks = this._callbacks || {},
                    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
                    this
            },
            i.prototype.once = function(e, t) {
                function n() {
                    this.off(e, n),
                        t.apply(this, arguments)
                }
                return n.fn = t,
                    this.on(e, n),
                    this
            },
            i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function(e, t) {
                if (this._callbacks = this._callbacks || {},
                    0 == arguments.length)
                    return this._callbacks = {},
                        this;
                var n = this._callbacks["$" + e];
                if (!n)
                    return this;
                if (1 == arguments.length)
                    return delete this._callbacks["$" + e],
                        this;
                for (var i, r = 0; r < n.length; r++)
                    if ((i = n[r]) === t || i.fn === t) {
                        n.splice(r, 1);
                        break
                    }
                return 0 === n.length && delete this._callbacks["$" + e],
                    this
            },
            i.prototype.emit = function(e) {
                this._callbacks = this._callbacks || {};
                for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], i = 1; i < arguments.length; i++)
                    t[i - 1] = arguments[i];
                if (n) {
                    n = n.slice(0);
                    for (var i = 0, r = n.length; i < r; ++i)
                        n[i].apply(this, t)
                }
                return this
            },
            i.prototype.listeners = function(e) {
                return this._callbacks = this._callbacks || {},
                    this._callbacks["$" + e] || []
            },
            i.prototype.hasListeners = function(e) {
                return !!this.listeners(e).length
            }
    }, function(e, t, n) {
        function i(e, t) {
            if (!e)
                return e;
            if (a(e)) {
                var n = {
                    _placeholder: !0,
                    num: t.length
                };
                return t.push(e),
                    n
            }
            if (o(e)) {
                for (var r = new Array(e.length), s = 0; s < e.length; s++)
                    r[s] = i(e[s], t);
                return r
            }
            if ("object" == typeof e && !(e instanceof Date)) {
                var r = {};
                for (var c in e)
                    r[c] = i(e[c], t);
                return r
            }
            return e
        }

        function r(e, t) {
            if (!e)
                return e;
            if (e && e._placeholder)
                return t[e.num];
            if (o(e))
                for (var n = 0; n < e.length; n++)
                    e[n] = r(e[n], t);
            else if ("object" == typeof e)
                for (var i in e)
                    e[i] = r(e[i], t);
            return e
        }
        var o = n(10),
            a = n(11),
            s = Object.prototype.toString,
            c = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === s.call(Blob),
            l = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === s.call(File);
        t.deconstructPacket = function(e) {
                var t = [],
                    n = e.data,
                    r = e;
                return r.data = i(n, t),
                    r.attachments = t.length, {
                        packet: r,
                        buffers: t
                    }
            },
            t.reconstructPacket = function(e, t) {
                return e.data = r(e.data, t),
                    e.attachments = void 0,
                    e
            },
            t.removeBlobs = function(e, t) {
                function n(e, s, u) {
                    if (!e)
                        return e;
                    if (c && e instanceof Blob || l && e instanceof File) {
                        i++;
                        var d = new FileReader;
                        d.onload = function() {
                                u ? u[s] = this.result : r = this.result,
                                    --i || t(r)
                            },
                            d.readAsArrayBuffer(e)
                    } else if (o(e))
                        for (var h = 0; h < e.length; h++)
                            n(e[h], h, e);
                    else if ("object" == typeof e && !a(e))
                        for (var f in e)
                            n(e[f], f, e)
                }
                var i = 0,
                    r = e;
                n(r),
                    i || t(r)
            }
    }, function(e, t) {
        var n = {}.toString;
        e.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    }, function(e, t) {
        function n(e) {
            return i && Buffer.isBuffer(e) || r && (e instanceof ArrayBuffer || o(e))
        }
        e.exports = n;
        var i = "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
            r = "function" == typeof ArrayBuffer,
            o = function(e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer
            }
    }, function(e, t, n) {
        function i(e, t) {
            if (!(this instanceof i))
                return new i(e, t);
            e && "object" == typeof e && (t = e,
                    e = void 0),
                t = t || {},
                t.path = t.path || "/socket.io",
                this.nsps = {},
                this.subs = [],
                this.opts = t,
                this.reconnection(!1 !== t.reconnection),
                this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
                this.reconnectionDelay(t.reconnectionDelay || 1e3),
                this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
                this.randomizationFactor(t.randomizationFactor || .5),
                this.backoff = new h({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }),
                this.timeout(null == t.timeout ? 2e4 : t.timeout),
                this.readyState = "closed",
                this.uri = e,
                this.connecting = [],
                this.lastPing = null,
                this.encoding = !1,
                this.packetBuffer = [];
            var n = t.parser || s;
            this.encoder = new n.Encoder,
                this.decoder = new n.Decoder,
                this.autoConnect = !1 !== t.autoConnect,
                this.autoConnect && this.open()
        }
        var r = n(13),
            o = n(37),
            a = n(8),
            s = n(7),
            c = n(39),
            l = n(40),
            u = n(3)("socket.io-client:manager"),
            d = n(36),
            h = n(41),
            f = Object.prototype.hasOwnProperty;
        e.exports = i,
            i.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var e in this.nsps)
                    f.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
            },
            i.prototype.updateSocketIds = function() {
                for (var e in this.nsps)
                    f.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
            },
            i.prototype.generateId = function(e) {
                return ("/" === e ? "" : e + "#") + this.engine.id
            },
            a(i.prototype),
            i.prototype.reconnection = function(e) {
                return arguments.length ? (this._reconnection = !!e,
                    this) : this._reconnection
            },
            i.prototype.reconnectionAttempts = function(e) {
                return arguments.length ? (this._reconnectionAttempts = e,
                    this) : this._reconnectionAttempts
            },
            i.prototype.reconnectionDelay = function(e) {
                return arguments.length ? (this._reconnectionDelay = e,
                    this.backoff && this.backoff.setMin(e),
                    this) : this._reconnectionDelay
            },
            i.prototype.randomizationFactor = function(e) {
                return arguments.length ? (this._randomizationFactor = e,
                    this.backoff && this.backoff.setJitter(e),
                    this) : this._randomizationFactor
            },
            i.prototype.reconnectionDelayMax = function(e) {
                return arguments.length ? (this._reconnectionDelayMax = e,
                    this.backoff && this.backoff.setMax(e),
                    this) : this._reconnectionDelayMax
            },
            i.prototype.timeout = function(e) {
                return arguments.length ? (this._timeout = e,
                    this) : this._timeout
            },
            i.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            },
            i.prototype.open = i.prototype.connect = function(e, t) {
                if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open"))
                    return this;
                u("opening %s", this.uri),
                    this.engine = r(this.uri, this.opts);
                var n = this.engine,
                    i = this;
                this.readyState = "opening",
                    this.skipReconnect = !1;
                var o = c(n, "open", function() {
                        i.onopen(),
                            e && e()
                    }),
                    a = c(n, "error", function(t) {
                        if (u("connect_error"),
                            i.cleanup(),
                            i.readyState = "closed",
                            i.emitAll("connect_error", t),
                            e) {
                            var n = new Error("Connection error");
                            n.data = t,
                                e(n)
                        } else
                            i.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var s = this._timeout;
                    u("connect attempt will timeout after %d", s),
                        0 === s && o.destroy();
                    var l = setTimeout(function() {
                        u("connect attempt timed out after %d", s),
                            o.destroy(),
                            n.close(),
                            n.emit("error", "timeout"),
                            i.emitAll("connect_timeout", s)
                    }, s);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(l)
                        }
                    })
                }
                return this.subs.push(o),
                    this.subs.push(a),
                    this
            },
            i.prototype.onopen = function() {
                u("open"),
                    this.cleanup(),
                    this.readyState = "open",
                    this.emit("open");
                var e = this.engine;
                this.subs.push(c(e, "data", l(this, "ondata"))),
                    this.subs.push(c(e, "ping", l(this, "onping"))),
                    this.subs.push(c(e, "pong", l(this, "onpong"))),
                    this.subs.push(c(e, "error", l(this, "onerror"))),
                    this.subs.push(c(e, "close", l(this, "onclose"))),
                    this.subs.push(c(this.decoder, "decoded", l(this, "ondecoded")))
            },
            i.prototype.onping = function() {
                this.lastPing = new Date,
                    this.emitAll("ping")
            },
            i.prototype.onpong = function() {
                this.emitAll("pong", new Date - this.lastPing)
            },
            i.prototype.ondata = function(e) {
                this.decoder.add(e)
            },
            i.prototype.ondecoded = function(e) {
                this.emit("packet", e)
            },
            i.prototype.onerror = function(e) {
                u("error", e),
                    this.emitAll("error", e)
            },
            i.prototype.socket = function(e, t) {
                function n() {
                    ~d(r.connecting, i) || r.connecting.push(i)
                }
                var i = this.nsps[e];
                if (!i) {
                    i = new o(this, e, t),
                        this.nsps[e] = i;
                    var r = this;
                    i.on("connecting", n),
                        i.on("connect", function() {
                            i.id = r.generateId(e)
                        }),
                        this.autoConnect && n()
                }
                return i
            },
            i.prototype.destroy = function(e) {
                var t = d(this.connecting, e);
                ~t && this.connecting.splice(t, 1),
                    this.connecting.length || this.close()
            },
            i.prototype.packet = function(e) {
                u("writing packet %j", e);
                var t = this;
                e.query && 0 === e.type && (e.nsp += "?" + e.query),
                    t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0,
                        this.encoder.encode(e, function(n) {
                            for (var i = 0; i < n.length; i++)
                                t.engine.write(n[i], e.options);
                            t.encoding = !1,
                                t.processPacketQueue()
                        }))
            },
            i.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var e = this.packetBuffer.shift();
                    this.packet(e)
                }
            },
            i.prototype.cleanup = function() {
                u("cleanup");
                for (var e = this.subs.length, t = 0; t < e; t++) {
                    this.subs.shift().destroy()
                }
                this.packetBuffer = [],
                    this.encoding = !1,
                    this.lastPing = null,
                    this.decoder.destroy()
            },
            i.prototype.close = i.prototype.disconnect = function() {
                u("disconnect"),
                    this.skipReconnect = !0,
                    this.reconnecting = !1,
                    "opening" === this.readyState && this.cleanup(),
                    this.backoff.reset(),
                    this.readyState = "closed",
                    this.engine && this.engine.close()
            },
            i.prototype.onclose = function(e) {
                u("onclose"),
                    this.cleanup(),
                    this.backoff.reset(),
                    this.readyState = "closed",
                    this.emit("close", e),
                    this._reconnection && !this.skipReconnect && this.reconnect()
            },
            i.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect)
                    return this;
                var e = this;
                if (this.backoff.attempts >= this._reconnectionAttempts)
                    u("reconnect failed"),
                    this.backoff.reset(),
                    this.emitAll("reconnect_failed"),
                    this.reconnecting = !1;
                else {
                    var t = this.backoff.duration();
                    u("will wait %dms before reconnect attempt", t),
                        this.reconnecting = !0;
                    var n = setTimeout(function() {
                        e.skipReconnect || (u("attempting reconnect"),
                            e.emitAll("reconnect_attempt", e.backoff.attempts),
                            e.emitAll("reconnecting", e.backoff.attempts),
                            e.skipReconnect || e.open(function(t) {
                                t ? (u("reconnect attempt error"),
                                    e.reconnecting = !1,
                                    e.reconnect(),
                                    e.emitAll("reconnect_error", t.data)) : (u("reconnect success"),
                                    e.onreconnect())
                            }))
                    }, t);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(n)
                        }
                    })
                }
            },
            i.prototype.onreconnect = function() {
                var e = this.backoff.attempts;
                this.reconnecting = !1,
                    this.backoff.reset(),
                    this.updateSocketIds(),
                    this.emitAll("reconnect", e)
            }
    }, function(e, t, n) {
        e.exports = n(14),
            e.exports.parser = n(22)
    }, function(e, t, n) {
        function i(e, t) {
            return this instanceof i ? (t = t || {},
                e && "object" == typeof e && (t = e,
                    e = null),
                e ? (e = u(e),
                    t.hostname = e.host,
                    t.secure = "https" === e.protocol || "wss" === e.protocol,
                    t.port = e.port,
                    e.query && (t.query = e.query)) : t.host && (t.hostname = u(t.host).host),
                this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol,
                t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
                this.agent = t.agent || !1,
                this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"),
                this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80),
                this.query = t.query || {},
                "string" == typeof this.query && (this.query = d.decode(this.query)),
                this.upgrade = !1 !== t.upgrade,
                this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/",
                this.forceJSONP = !!t.forceJSONP,
                this.jsonp = !1 !== t.jsonp,
                this.forceBase64 = !!t.forceBase64,
                this.enablesXDR = !!t.enablesXDR,
                this.withCredentials = !1 !== t.withCredentials,
                this.timestampParam = t.timestampParam || "t",
                this.timestampRequests = t.timestampRequests,
                this.transports = t.transports || ["polling", "websocket"],
                this.transportOptions = t.transportOptions || {},
                this.readyState = "",
                this.writeBuffer = [],
                this.prevBufferLen = 0,
                this.policyPort = t.policyPort || 843,
                this.rememberUpgrade = t.rememberUpgrade || !1,
                this.binaryType = null,
                this.onlyBinaryUpgrades = t.onlyBinaryUpgrades,
                this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
                this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                this.pfx = t.pfx || null,
                this.key = t.key || null,
                this.passphrase = t.passphrase || null,
                this.cert = t.cert || null,
                this.ca = t.ca || null,
                this.ciphers = t.ciphers || null,
                this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized,
                this.forceNode = !!t.forceNode,
                this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(),
                ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders),
                    t.localAddress && (this.localAddress = t.localAddress)),
                this.id = null,
                this.upgrades = null,
                this.pingInterval = null,
                this.pingTimeout = null,
                this.pingIntervalTimer = null,
                this.pingTimeoutTimer = null,
                void this.open()) : new i(e, t)
        }

        function r(e) {
            var t = {};
            for (var n in e)
                e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }
        var o = n(15),
            a = n(8),
            s = n(3)("engine.io-client:socket"),
            c = n(36),
            l = n(22),
            u = n(2),
            d = n(30);
        e.exports = i,
            i.priorWebsocketSuccess = !1,
            a(i.prototype),
            i.protocol = l.protocol,
            i.Socket = i,
            i.Transport = n(21),
            i.transports = n(15),
            i.parser = n(22),
            i.prototype.createTransport = function(e) {
                s('creating transport "%s"', e);
                var t = r(this.query);
                t.EIO = l.protocol,
                    t.transport = e;
                var n = this.transportOptions[e] || {};
                return this.id && (t.sid = this.id),
                    new o[e]({
                        query: t,
                        socket: this,
                        agent: n.agent || this.agent,
                        hostname: n.hostname || this.hostname,
                        port: n.port || this.port,
                        secure: n.secure || this.secure,
                        path: n.path || this.path,
                        forceJSONP: n.forceJSONP || this.forceJSONP,
                        jsonp: n.jsonp || this.jsonp,
                        forceBase64: n.forceBase64 || this.forceBase64,
                        enablesXDR: n.enablesXDR || this.enablesXDR,
                        withCredentials: n.withCredentials || this.withCredentials,
                        timestampRequests: n.timestampRequests || this.timestampRequests,
                        timestampParam: n.timestampParam || this.timestampParam,
                        policyPort: n.policyPort || this.policyPort,
                        pfx: n.pfx || this.pfx,
                        key: n.key || this.key,
                        passphrase: n.passphrase || this.passphrase,
                        cert: n.cert || this.cert,
                        ca: n.ca || this.ca,
                        ciphers: n.ciphers || this.ciphers,
                        rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                        perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                        extraHeaders: n.extraHeaders || this.extraHeaders,
                        forceNode: n.forceNode || this.forceNode,
                        localAddress: n.localAddress || this.localAddress,
                        requestTimeout: n.requestTimeout || this.requestTimeout,
                        protocols: n.protocols || void 0,
                        isReactNative: this.isReactNative
                    })
            },
            i.prototype.open = function() {
                var e;
                if (this.rememberUpgrade && i.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
                    e = "websocket";
                else {
                    if (0 === this.transports.length) {
                        var t = this;
                        return void setTimeout(function() {
                            t.emit("error", "No transports available")
                        }, 0)
                    }
                    e = this.transports[0]
                }
                this.readyState = "opening";
                try {
                    e = this.createTransport(e)
                } catch (e) {
                    return this.transports.shift(),
                        void this.open()
                }
                e.open(),
                    this.setTransport(e)
            },
            i.prototype.setTransport = function(e) {
                s("setting transport %s", e.name);
                var t = this;
                this.transport && (s("clearing existing transport %s", this.transport.name),
                        this.transport.removeAllListeners()),
                    this.transport = e,
                    e.on("drain", function() {
                        t.onDrain()
                    }).on("packet", function(e) {
                        t.onPacket(e)
                    }).on("error", function(e) {
                        t.onError(e)
                    }).on("close", function() {
                        t.onClose("transport close")
                    })
            },
            i.prototype.probe = function(e) {
                function t() {
                    if (h.onlyBinaryUpgrades) {
                        var t = !this.supportsBinary && h.transport.supportsBinary;
                        d = d || t
                    }
                    d || (s('probe transport "%s" opened', e),
                        u.send([{
                            type: "ping",
                            data: "probe"
                        }]),
                        u.once("packet", function(t) {
                            if (!d)
                                if ("pong" === t.type && "probe" === t.data) {
                                    if (s('probe transport "%s" pong', e),
                                        h.upgrading = !0,
                                        h.emit("upgrading", u), !u)
                                        return;
                                    i.priorWebsocketSuccess = "websocket" === u.name,
                                        s('pausing current transport "%s"', h.transport.name),
                                        h.transport.pause(function() {
                                            d || "closed" !== h.readyState && (s("changing transport and sending upgrade packet"),
                                                l(),
                                                h.setTransport(u),
                                                u.send([{
                                                    type: "upgrade"
                                                }]),
                                                h.emit("upgrade", u),
                                                u = null,
                                                h.upgrading = !1,
                                                h.flush())
                                        })
                                } else {
                                    s('probe transport "%s" failed', e);
                                    var n = new Error("probe error");
                                    n.transport = u.name,
                                        h.emit("upgradeError", n)
                                }
                        }))
                }

                function n() {
                    d || (d = !0,
                        l(),
                        u.close(),
                        u = null)
                }

                function r(t) {
                    var i = new Error("probe error: " + t);
                    i.transport = u.name,
                        n(),
                        s('probe transport "%s" failed because of error: %s', e, t),
                        h.emit("upgradeError", i)
                }

                function o() {
                    r("transport closed")
                }

                function a() {
                    r("socket closed")
                }

                function c(e) {
                    u && e.name !== u.name && (s('"%s" works - aborting "%s"', e.name, u.name),
                        n())
                }

                function l() {
                    u.removeListener("open", t),
                        u.removeListener("error", r),
                        u.removeListener("close", o),
                        h.removeListener("close", a),
                        h.removeListener("upgrading", c)
                }
                s('probing transport "%s"', e);
                var u = this.createTransport(e, {
                        probe: 1
                    }),
                    d = !1,
                    h = this;
                i.priorWebsocketSuccess = !1,
                    u.once("open", t),
                    u.once("error", r),
                    u.once("close", o),
                    this.once("close", a),
                    this.once("upgrading", c),
                    u.open()
            },
            i.prototype.onOpen = function() {
                if (s("socket open"),
                    this.readyState = "open",
                    i.priorWebsocketSuccess = "websocket" === this.transport.name,
                    this.emit("open"),
                    this.flush(),
                    "open" === this.readyState && this.upgrade && this.transport.pause) {
                    s("starting upgrade probes");
                    for (var e = 0, t = this.upgrades.length; e < t; e++)
                        this.probe(this.upgrades[e])
                }
            },
            i.prototype.onPacket = function(e) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                    switch (s('socket receive: type "%s", data "%s"', e.type, e.data),
                        this.emit("packet", e),
                        this.emit("heartbeat"),
                        e.type) {
                        case "open":
                            this.onHandshake(JSON.parse(e.data));
                            break;
                        case "pong":
                            this.setPing(),
                                this.emit("pong");
                            break;
                        case "error":
                            var t = new Error("server error");
                            t.code = e.data,
                                this.onError(t);
                            break;
                        case "message":
                            this.emit("data", e.data),
                                this.emit("message", e.data)
                    }
                else
                    s('packet received with socket readyState "%s"', this.readyState)
            },
            i.prototype.onHandshake = function(e) {
                this.emit("handshake", e),
                    this.id = e.sid,
                    this.transport.query.sid = e.sid,
                    this.upgrades = this.filterUpgrades(e.upgrades),
                    this.pingInterval = e.pingInterval,
                    this.pingTimeout = e.pingTimeout,
                    this.onOpen(),
                    "closed" !== this.readyState && (this.setPing(),
                        this.removeListener("heartbeat", this.onHeartbeat),
                        this.on("heartbeat", this.onHeartbeat))
            },
            i.prototype.onHeartbeat = function(e) {
                clearTimeout(this.pingTimeoutTimer);
                var t = this;
                t.pingTimeoutTimer = setTimeout(function() {
                    "closed" !== t.readyState && t.onClose("ping timeout")
                }, e || t.pingInterval + t.pingTimeout)
            },
            i.prototype.setPing = function() {
                var e = this;
                clearTimeout(e.pingIntervalTimer),
                    e.pingIntervalTimer = setTimeout(function() {
                        s("writing ping packet - expecting pong within %sms", e.pingTimeout),
                            e.ping(),
                            e.onHeartbeat(e.pingTimeout)
                    }, e.pingInterval)
            },
            i.prototype.ping = function() {
                var e = this;
                this.sendPacket("ping", function() {
                    e.emit("ping")
                })
            },
            i.prototype.onDrain = function() {
                this.writeBuffer.splice(0, this.prevBufferLen),
                    this.prevBufferLen = 0,
                    0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
            },
            i.prototype.flush = function() {
                "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length),
                    this.transport.send(this.writeBuffer),
                    this.prevBufferLen = this.writeBuffer.length,
                    this.emit("flush"))
            },
            i.prototype.write = i.prototype.send = function(e, t, n) {
                return this.sendPacket("message", e, t, n),
                    this
            },
            i.prototype.sendPacket = function(e, t, n, i) {
                if ("function" == typeof t && (i = t,
                        t = void 0),
                    "function" == typeof n && (i = n,
                        n = null),
                    "closing" !== this.readyState && "closed" !== this.readyState) {
                    n = n || {},
                        n.compress = !1 !== n.compress;
                    var r = {
                        type: e,
                        data: t,
                        options: n
                    };
                    this.emit("packetCreate", r),
                        this.writeBuffer.push(r),
                        i && this.once("flush", i),
                        this.flush()
                }
            },
            i.prototype.close = function() {
                function e() {
                    i.onClose("forced close"),
                        s("socket closing - telling transport to close"),
                        i.transport.close()
                }

                function t() {
                    i.removeListener("upgrade", t),
                        i.removeListener("upgradeError", t),
                        e()
                }

                function n() {
                    i.once("upgrade", t),
                        i.once("upgradeError", t)
                }
                if ("opening" === this.readyState || "open" === this.readyState) {
                    this.readyState = "closing";
                    var i = this;
                    this.writeBuffer.length ? this.once("drain", function() {
                        this.upgrading ? n() : e()
                    }) : this.upgrading ? n() : e()
                }
                return this
            },
            i.prototype.onError = function(e) {
                s("socket error %j", e),
                    i.priorWebsocketSuccess = !1,
                    this.emit("error", e),
                    this.onClose("transport error", e)
            },
            i.prototype.onClose = function(e, t) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                    s('socket close with reason: "%s"', e);
                    var n = this;
                    clearTimeout(this.pingIntervalTimer),
                        clearTimeout(this.pingTimeoutTimer),
                        this.transport.removeAllListeners("close"),
                        this.transport.close(),
                        this.transport.removeAllListeners(),
                        this.readyState = "closed",
                        this.id = null,
                        this.emit("close", e, t),
                        n.writeBuffer = [],
                        n.prevBufferLen = 0
                }
            },
            i.prototype.filterUpgrades = function(e) {
                for (var t = [], n = 0, i = e.length; n < i; n++)
                    ~c(this.transports, e[n]) && t.push(e[n]);
                return t
            }
    }, function(e, t, n) {
        function i(e) {
            var t = !1,
                n = !1,
                i = !1 !== e.jsonp;
            if ("undefined" != typeof location) {
                var s = "https:" === location.protocol,
                    c = location.port;
                c || (c = s ? 443 : 80),
                    t = e.hostname !== location.hostname || c !== e.port,
                    n = e.secure !== s
            }
            if (e.xdomain = t,
                e.xscheme = n,
                "open" in new r(e) && !e.forceJSONP)
                return new o(e);
            if (!i)
                throw new Error("JSONP disabled");
            return new a(e)
        }
        var r = n(16),
            o = n(19),
            a = n(33),
            s = n(34);
        t.polling = i,
            t.websocket = s
    }, function(e, t, n) {
        var i = n(17),
            r = n(18);
        e.exports = function(e) {
            var t = e.xdomain,
                n = e.xscheme,
                o = e.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!t || i))
                    return new XMLHttpRequest
            } catch (e) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o)
                    return new XDomainRequest
            } catch (e) {}
            if (!t)
                try {
                    return new(r[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (e) {}
        }
    }, function(e, t) {
        try {
            e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
        } catch (t) {
            e.exports = !1
        }
    }, function(e, t) {
        e.exports = function() {
            return "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")()
        }()
    }, function(e, t, n) {
        function i() {}

        function r(e) {
            if (c.call(this, e),
                this.requestTimeout = e.requestTimeout,
                this.extraHeaders = e.extraHeaders,
                "undefined" != typeof location) {
                var t = "https:" === location.protocol,
                    n = location.port;
                n || (n = t ? 443 : 80),
                    this.xd = "undefined" != typeof location && e.hostname !== location.hostname || n !== e.port,
                    this.xs = e.secure !== t
            }
        }

        function o(e) {
            this.method = e.method || "GET",
                this.uri = e.uri,
                this.xd = !!e.xd,
                this.xs = !!e.xs,
                this.async = !1 !== e.async,
                this.data = void 0 !== e.data ? e.data : null,
                this.agent = e.agent,
                this.isBinary = e.isBinary,
                this.supportsBinary = e.supportsBinary,
                this.enablesXDR = e.enablesXDR,
                this.withCredentials = e.withCredentials,
                this.requestTimeout = e.requestTimeout,
                this.pfx = e.pfx,
                this.key = e.key,
                this.passphrase = e.passphrase,
                this.cert = e.cert,
                this.ca = e.ca,
                this.ciphers = e.ciphers,
                this.rejectUnauthorized = e.rejectUnauthorized,
                this.extraHeaders = e.extraHeaders,
                this.create()
        }

        function a() {
            for (var e in o.requests)
                o.requests.hasOwnProperty(e) && o.requests[e].abort()
        }
        var s = n(16),
            c = n(20),
            l = n(8),
            u = n(31),
            d = n(3)("engine.io-client:polling-xhr"),
            h = n(18);
        if (e.exports = r,
            e.exports.Request = o,
            u(r, c),
            r.prototype.supportsBinary = !0,
            r.prototype.request = function(e) {
                return e = e || {},
                    e.uri = this.uri(),
                    e.xd = this.xd,
                    e.xs = this.xs,
                    e.agent = this.agent || !1,
                    e.supportsBinary = this.supportsBinary,
                    e.enablesXDR = this.enablesXDR,
                    e.withCredentials = this.withCredentials,
                    e.pfx = this.pfx,
                    e.key = this.key,
                    e.passphrase = this.passphrase,
                    e.cert = this.cert,
                    e.ca = this.ca,
                    e.ciphers = this.ciphers,
                    e.rejectUnauthorized = this.rejectUnauthorized,
                    e.requestTimeout = this.requestTimeout,
                    e.extraHeaders = this.extraHeaders,
                    new o(e)
            },
            r.prototype.doWrite = function(e, t) {
                var n = "string" != typeof e && void 0 !== e,
                    i = this.request({
                        method: "POST",
                        data: e,
                        isBinary: n
                    }),
                    r = this;
                i.on("success", t),
                    i.on("error", function(e) {
                        r.onError("xhr post error", e)
                    }),
                    this.sendXhr = i
            },
            r.prototype.doPoll = function() {
                d("xhr poll");
                var e = this.request(),
                    t = this;
                e.on("data", function(e) {
                        t.onData(e)
                    }),
                    e.on("error", function(e) {
                        t.onError("xhr poll error", e)
                    }),
                    this.pollXhr = e
            },
            l(o.prototype),
            o.prototype.create = function() {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx,
                    e.key = this.key,
                    e.passphrase = this.passphrase,
                    e.cert = this.cert,
                    e.ca = this.ca,
                    e.ciphers = this.ciphers,
                    e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new s(e),
                    n = this;
                try {
                    d("xhr open %s: %s", this.method, this.uri),
                        t.open(this.method, this.uri, this.async);
                    try {
                        if (this.extraHeaders) {
                            t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0);
                            for (var i in this.extraHeaders)
                                this.extraHeaders.hasOwnProperty(i) && t.setRequestHeader(i, this.extraHeaders[i])
                        }
                    } catch (e) {}
                    if ("POST" === this.method)
                        try {
                            this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (e) {}
                    try {
                        t.setRequestHeader("Accept", "*/*")
                    } catch (e) {}
                    "withCredentials" in t && (t.withCredentials = this.withCredentials),
                        this.requestTimeout && (t.timeout = this.requestTimeout),
                        this.hasXDR() ? (t.onload = function() {
                                n.onLoad()
                            },
                            t.onerror = function() {
                                n.onError(t.responseText)
                            }
                        ) : t.onreadystatechange = function() {
                            if (2 === t.readyState)
                                try {
                                    var e = t.getResponseHeader("Content-Type");
                                    (n.supportsBinary && "application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && (t.responseType = "arraybuffer")
                                } catch (e) {}
                            4 === t.readyState && (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout(function() {
                                n.onError("number" == typeof t.status ? t.status : 0)
                            }, 0))
                        },
                        d("xhr data %s", this.data),
                        t.send(this.data)
                } catch (e) {
                    return void setTimeout(function() {
                        n.onError(e)
                    }, 0)
                }
                "undefined" != typeof document && (this.index = o.requestsCount++,
                    o.requests[this.index] = this)
            },
            o.prototype.onSuccess = function() {
                this.emit("success"),
                    this.cleanup()
            },
            o.prototype.onData = function(e) {
                this.emit("data", e),
                    this.onSuccess()
            },
            o.prototype.onError = function(e) {
                this.emit("error", e),
                    this.cleanup(!0)
            },
            o.prototype.cleanup = function(e) {
                if (void 0 !== this.xhr && null !== this.xhr) {
                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = i : this.xhr.onreadystatechange = i,
                        e)
                        try {
                            this.xhr.abort()
                        } catch (e) {}
                    "undefined" != typeof document && delete o.requests[this.index],
                        this.xhr = null
                }
            },
            o.prototype.onLoad = function() {
                var e;
                try {
                    var t;
                    try {
                        t = this.xhr.getResponseHeader("Content-Type")
                    } catch (e) {}
                    e = "application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t ? this.xhr.response || this.xhr.responseText : this.xhr.responseText
                } catch (e) {
                    this.onError(e)
                }
                null != e && this.onData(e)
            },
            o.prototype.hasXDR = function() {
                return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
            },
            o.prototype.abort = function() {
                this.cleanup()
            },
            o.requestsCount = 0,
            o.requests = {},
            "undefined" != typeof document)
            if ("function" == typeof attachEvent)
                attachEvent("onunload", a);
            else if ("function" == typeof addEventListener) {
            var f = "onpagehide" in h ? "pagehide" : "unload";
            addEventListener(f, a, !1)
        }
    }, function(e, t, n) {
        function i(e) {
            var t = e && e.forceBase64;
            u && !t || (this.supportsBinary = !1),
                r.call(this, e)
        }
        var r = n(21),
            o = n(30),
            a = n(22),
            s = n(31),
            c = n(32),
            l = n(3)("engine.io-client:polling");
        e.exports = i;
        var u = function() {
            return null != new(n(16))({
                xdomain: !1
            }).responseType
        }();
        s(i, r),
            i.prototype.name = "polling",
            i.prototype.doOpen = function() {
                this.poll()
            },
            i.prototype.pause = function(e) {
                function t() {
                    l("paused"),
                        n.readyState = "paused",
                        e()
                }
                var n = this;
                if (this.readyState = "pausing",
                    this.polling || !this.writable) {
                    var i = 0;
                    this.polling && (l("we are currently polling - waiting to pause"),
                            i++,
                            this.once("pollComplete", function() {
                                l("pre-pause polling complete"),
                                    --i || t()
                            })),
                        this.writable || (l("we are currently writing - waiting to pause"),
                            i++,
                            this.once("drain", function() {
                                l("pre-pause writing complete"),
                                    --i || t()
                            }))
                } else
                    t()
            },
            i.prototype.poll = function() {
                l("polling"),
                    this.polling = !0,
                    this.doPoll(),
                    this.emit("poll")
            },
            i.prototype.onData = function(e) {
                var t = this;
                l("polling got data %s", e);
                var n = function(e, n, i) {
                    return "opening" === t.readyState && t.onOpen(),
                        "close" === e.type ? (t.onClose(), !1) : void t.onPacket(e)
                };
                a.decodePayload(e, this.socket.binaryType, n),
                    "closed" !== this.readyState && (this.polling = !1,
                        this.emit("pollComplete"),
                        "open" === this.readyState ? this.poll() : l('ignoring poll - transport state "%s"', this.readyState))
            },
            i.prototype.doClose = function() {
                function e() {
                    l("writing close packet"),
                        t.write([{
                            type: "close"
                        }])
                }
                var t = this;
                "open" === this.readyState ? (l("transport open - closing"),
                    e()) : (l("transport not open - deferring close"),
                    this.once("open", e))
            },
            i.prototype.write = function(e) {
                var t = this;
                this.writable = !1;
                var n = function() {
                    t.writable = !0,
                        t.emit("drain")
                };
                a.encodePayload(e, this.supportsBinary, function(e) {
                    t.doWrite(e, n)
                })
            },
            i.prototype.uri = function() {
                var e = this.query || {},
                    t = this.secure ? "https" : "http",
                    n = "";
                return !1 !== this.timestampRequests && (e[this.timestampParam] = c()),
                    this.supportsBinary || e.sid || (e.b64 = 1),
                    e = o.encode(e),
                    this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port),
                    e.length && (e = "?" + e),
                    t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
            }
    }, function(e, t, n) {
        function i(e) {
            this.path = e.path,
                this.hostname = e.hostname,
                this.port = e.port,
                this.secure = e.secure,
                this.query = e.query,
                this.timestampParam = e.timestampParam,
                this.timestampRequests = e.timestampRequests,
                this.readyState = "",
                this.agent = e.agent || !1,
                this.socket = e.socket,
                this.enablesXDR = e.enablesXDR,
                this.withCredentials = e.withCredentials,
                this.pfx = e.pfx,
                this.key = e.key,
                this.passphrase = e.passphrase,
                this.cert = e.cert,
                this.ca = e.ca,
                this.ciphers = e.ciphers,
                this.rejectUnauthorized = e.rejectUnauthorized,
                this.forceNode = e.forceNode,
                this.isReactNative = e.isReactNative,
                this.extraHeaders = e.extraHeaders,
                this.localAddress = e.localAddress
        }
        var r = n(22),
            o = n(8);
        e.exports = i,
            o(i.prototype),
            i.prototype.onError = function(e, t) {
                var n = new Error(e);
                return n.type = "TransportError",
                    n.description = t,
                    this.emit("error", n),
                    this
            },
            i.prototype.open = function() {
                return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
                        this.doOpen()),
                    this
            },
            i.prototype.close = function() {
                return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
                        this.onClose()),
                    this
            },
            i.prototype.send = function(e) {
                if ("open" !== this.readyState)
                    throw new Error("Transport not open");
                this.write(e)
            },
            i.prototype.onOpen = function() {
                this.readyState = "open",
                    this.writable = !0,
                    this.emit("open")
            },
            i.prototype.onData = function(e) {
                var t = r.decodePacket(e, this.socket.binaryType);
                this.onPacket(t)
            },
            i.prototype.onPacket = function(e) {
                this.emit("packet", e)
            },
            i.prototype.onClose = function() {
                this.readyState = "closed",
                    this.emit("close")
            }
    }, function(e, t, n) {
        function i(e, n) {
            return n("b" + t.packets[e.type] + e.data.data)
        }

        function r(e, n, i) {
            if (!n)
                return t.encodeBase64Packet(e, i);
            var r = e.data,
                o = new Uint8Array(r),
                a = new Uint8Array(1 + r.byteLength);
            a[0] = y[e.type];
            for (var s = 0; s < o.length; s++)
                a[s + 1] = o[s];
            return i(a.buffer)
        }

        function o(e, n, i) {
            if (!n)
                return t.encodeBase64Packet(e, i);
            var r = new FileReader;
            return r.onload = function() {
                    t.encodePacket({
                        type: e.type,
                        data: r.result
                    }, n, !0, i)
                },
                r.readAsArrayBuffer(e.data)
        }

        function a(e, n, i) {
            if (!n)
                return t.encodeBase64Packet(e, i);
            if (v)
                return o(e, n, i);
            var r = new Uint8Array(1);
            return r[0] = y[e.type],
                i(new k([r.buffer, e.data]))
        }

        function s(e) {
            try {
                e = p.decode(e, {
                    strict: !1
                })
            } catch (e) {
                return !1
            }
            return e
        }

        function c(e, t, n) {
            for (var i = new Array(e.length), r = f(e.length, n), o = 0; o < e.length; o++)
                ! function(e, n, r) {
                    t(n, function(t, n) {
                        i[e] = n,
                            r(t, i)
                    })
                }(o, e[o], r)
        }
        var l, u = n(23),
            d = n(24),
            h = n(25),
            f = n(26),
            p = n(27);
        "undefined" != typeof ArrayBuffer && (l = n(28));
        var g = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
            m = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
            v = g || m;
        t.protocol = 3;
        var y = t.packets = {
                open: 0,
                close: 1,
                ping: 2,
                pong: 3,
                message: 4,
                upgrade: 5,
                noop: 6
            },
            b = u(y),
            w = {
                type: "error",
                data: "parser error"
            },
            k = n(29);
        t.encodePacket = function(e, t, n, o) {
                "function" == typeof t && (o = t,
                        t = !1),
                    "function" == typeof n && (o = n,
                        n = null);
                var s = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer)
                    return r(e, t, o);
                if (void 0 !== k && s instanceof k)
                    return a(e, t, o);
                if (s && s.base64)
                    return i(e, o);
                var c = y[e.type];
                return void 0 !== e.data && (c += n ? p.encode(String(e.data), {
                        strict: !1
                    }) : String(e.data)),
                    o("" + c)
            },
            t.encodeBase64Packet = function(e, n) {
                var i = "b" + t.packets[e.type];
                if (void 0 !== k && e.data instanceof k) {
                    var r = new FileReader;
                    return r.onload = function() {
                            var e = r.result.split(",")[1];
                            n(i + e)
                        },
                        r.readAsDataURL(e.data)
                }
                var o;
                try {
                    o = String.fromCharCode.apply(null, new Uint8Array(e.data))
                } catch (t) {
                    for (var a = new Uint8Array(e.data), s = new Array(a.length), c = 0; c < a.length; c++)
                        s[c] = a[c];
                    o = String.fromCharCode.apply(null, s)
                }
                return i += btoa(o),
                    n(i)
            },
            t.decodePacket = function(e, n, i) {
                if (void 0 === e)
                    return w;
                if ("string" == typeof e) {
                    if ("b" === e.charAt(0))
                        return t.decodeBase64Packet(e.substr(1), n);
                    if (i && !1 === (e = s(e)))
                        return w;
                    var r = e.charAt(0);
                    return Number(r) == r && b[r] ? e.length > 1 ? {
                        type: b[r],
                        data: e.substring(1)
                    } : {
                        type: b[r]
                    } : w
                }
                var o = new Uint8Array(e),
                    r = o[0],
                    a = h(e, 1);
                return k && "blob" === n && (a = new k([a])), {
                    type: b[r],
                    data: a
                }
            },
            t.decodeBase64Packet = function(e, t) {
                var n = b[e.charAt(0)];
                if (!l)
                    return {
                        type: n,
                        data: {
                            base64: !0,
                            data: e.substr(1)
                        }
                    };
                var i = l.decode(e.substr(1));
                return "blob" === t && k && (i = new k([i])), {
                    type: n,
                    data: i
                }
            },
            t.encodePayload = function(e, n, i) {
                function r(e) {
                    return e.length + ":" + e
                }

                function o(e, i) {
                    t.encodePacket(e, !!a && n, !1, function(e) {
                        i(null, r(e))
                    })
                }
                "function" == typeof n && (i = n,
                    n = null);
                var a = d(e);
                return n && a ? k && !v ? t.encodePayloadAsBlob(e, i) : t.encodePayloadAsArrayBuffer(e, i) : e.length ? void c(e, o, function(e, t) {
                    return i(t.join(""))
                }) : i("0:")
            },
            t.decodePayload = function(e, n, i) {
                if ("string" != typeof e)
                    return t.decodePayloadAsBinary(e, n, i);
                "function" == typeof n && (i = n,
                    n = null);
                var r;
                if ("" === e)
                    return i(w, 0, 1);
                for (var o, a, s = "", c = 0, l = e.length; c < l; c++) {
                    var u = e.charAt(c);
                    if (":" === u) {
                        if ("" === s || s != (o = Number(s)))
                            return i(w, 0, 1);
                        if (a = e.substr(c + 1, o),
                            s != a.length)
                            return i(w, 0, 1);
                        if (a.length) {
                            if (r = t.decodePacket(a, n, !1),
                                w.type === r.type && w.data === r.data)
                                return i(w, 0, 1);
                            if (!1 === i(r, c + o, l))
                                return
                        }
                        c += o,
                            s = ""
                    } else
                        s += u
                }
                return "" !== s ? i(w, 0, 1) : void 0
            },
            t.encodePayloadAsArrayBuffer = function(e, n) {
                function i(e, n) {
                    t.encodePacket(e, !0, !0, function(e) {
                        return n(null, e)
                    })
                }
                return e.length ? void c(e, i, function(e, t) {
                    var i = t.reduce(function(e, t) {
                            var n;
                            return n = "string" == typeof t ? t.length : t.byteLength,
                                e + n.toString().length + n + 2
                        }, 0),
                        r = new Uint8Array(i),
                        o = 0;
                    return t.forEach(function(e) {
                            var t = "string" == typeof e,
                                n = e;
                            if (t) {
                                for (var i = new Uint8Array(e.length), a = 0; a < e.length; a++)
                                    i[a] = e.charCodeAt(a);
                                n = i.buffer
                            }
                            r[o++] = t ? 0 : 1;
                            for (var s = n.byteLength.toString(), a = 0; a < s.length; a++)
                                r[o++] = parseInt(s[a]);
                            r[o++] = 255;
                            for (var i = new Uint8Array(n), a = 0; a < i.length; a++)
                                r[o++] = i[a]
                        }),
                        n(r.buffer)
                }) : n(new ArrayBuffer(0))
            },
            t.encodePayloadAsBlob = function(e, n) {
                function i(e, n) {
                    t.encodePacket(e, !0, !0, function(e) {
                        var t = new Uint8Array(1);
                        if (t[0] = 1,
                            "string" == typeof e) {
                            for (var i = new Uint8Array(e.length), r = 0; r < e.length; r++)
                                i[r] = e.charCodeAt(r);
                            e = i.buffer,
                                t[0] = 0
                        }
                        for (var o = e instanceof ArrayBuffer ? e.byteLength : e.size, a = o.toString(), s = new Uint8Array(a.length + 1), r = 0; r < a.length; r++)
                            s[r] = parseInt(a[r]);
                        if (s[a.length] = 255,
                            k) {
                            var c = new k([t.buffer, s.buffer, e]);
                            n(null, c)
                        }
                    })
                }
                c(e, i, function(e, t) {
                    return n(new k(t))
                })
            },
            t.decodePayloadAsBinary = function(e, n, i) {
                "function" == typeof n && (i = n,
                    n = null);
                for (var r = e, o = []; r.byteLength > 0;) {
                    for (var a = new Uint8Array(r), s = 0 === a[0], c = "", l = 1; 255 !== a[l]; l++) {
                        if (c.length > 310)
                            return i(w, 0, 1);
                        c += a[l]
                    }
                    r = h(r, 2 + c.length),
                        c = parseInt(c);
                    var u = h(r, 0, c);
                    if (s)
                        try {
                            u = String.fromCharCode.apply(null, new Uint8Array(u))
                        } catch (e) {
                            var d = new Uint8Array(u);
                            u = "";
                            for (var l = 0; l < d.length; l++)
                                u += String.fromCharCode(d[l])
                        }
                    o.push(u),
                        r = h(r, c)
                }
                var f = o.length;
                o.forEach(function(e, r) {
                    i(t.decodePacket(e, n, !0), r, f)
                })
            }
    }, function(e, t) {
        e.exports = Object.keys || function(e) {
            var t = [],
                n = Object.prototype.hasOwnProperty;
            for (var i in e)
                n.call(e, i) && t.push(i);
            return t
        }
    }, function(e, t, n) {
        function i(e) {
            if (!e || "object" != typeof e)
                return !1;
            if (r(e)) {
                for (var t = 0, n = e.length; t < n; t++)
                    if (i(e[t]))
                        return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || a && e instanceof Blob || s && e instanceof File)
                return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length)
                return i(e.toJSON(), !0);
            for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o) && i(e[o]))
                    return !0;
            return !1
        }
        var r = n(10),
            o = Object.prototype.toString,
            a = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob),
            s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        e.exports = i
    }, function(e, t) {
        e.exports = function(e, t, n) {
            var i = e.byteLength;
            if (t = t || 0,
                n = n || i,
                e.slice)
                return e.slice(t, n);
            if (t < 0 && (t += i),
                n < 0 && (n += i),
                n > i && (n = i),
                t >= i || t >= n || 0 === i)
                return new ArrayBuffer(0);
            for (var r = new Uint8Array(e), o = new Uint8Array(n - t), a = t, s = 0; a < n; a++,
                s++)
                o[s] = r[a];
            return o.buffer
        }
    }, function(e, t) {
        function n(e, t, n) {
            function r(e, i) {
                if (r.count <= 0)
                    throw new Error("after called too many times");
                --r.count,
                    e ? (o = !0,
                        t(e),
                        t = n) : 0 !== r.count || o || t(null, i)
            }
            var o = !1;
            return n = n || i,
                r.count = e,
                0 === e ? t() : r
        }

        function i() {}
        e.exports = n
    }, function(e, t) {
        function n(e) {
            for (var t, n, i = [], r = 0, o = e.length; r < o;)
                t = e.charCodeAt(r++),
                t >= 55296 && t <= 56319 && r < o ? (n = e.charCodeAt(r++),
                    56320 == (64512 & n) ? i.push(((1023 & t) << 10) + (1023 & n) + 65536) : (i.push(t),
                        r--)) : i.push(t);
            return i
        }

        function i(e) {
            for (var t, n = e.length, i = -1, r = ""; ++i < n;)
                t = e[i],
                t > 65535 && (t -= 65536,
                    r += p(t >>> 10 & 1023 | 55296),
                    t = 56320 | 1023 & t),
                r += p(t);
            return r
        }

        function r(e, t) {
            if (e >= 55296 && e <= 57343) {
                if (t)
                    throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }

        function o(e, t) {
            return p(e >> t & 63 | 128)
        }

        function a(e, t) {
            if (0 == (4294967168 & e))
                return p(e);
            var n = "";
            return 0 == (4294965248 & e) ? n = p(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (r(e, t) || (e = 65533),
                    n = p(e >> 12 & 15 | 224),
                    n += o(e, 6)) : 0 == (4292870144 & e) && (n = p(e >> 18 & 7 | 240),
                    n += o(e, 12),
                    n += o(e, 6)),
                n += p(63 & e | 128)
        }

        function s(e, t) {
            t = t || {};
            for (var i, r = !1 !== t.strict, o = n(e), s = o.length, c = -1, l = ""; ++c < s;)
                i = o[c],
                l += a(i, r);
            return l
        }

        function c() {
            if (f >= h)
                throw Error("Invalid byte index");
            var e = 255 & d[f];
            if (f++,
                128 == (192 & e))
                return 63 & e;
            throw Error("Invalid continuation byte")
        }

        function l(e) {
            var t, n, i, o, a;
            if (f > h)
                throw Error("Invalid byte index");
            if (f == h)
                return !1;
            if (t = 255 & d[f],
                f++,
                0 == (128 & t))
                return t;
            if (192 == (224 & t)) {
                if (n = c(),
                    (a = (31 & t) << 6 | n) >= 128)
                    return a;
                throw Error("Invalid continuation byte")
            }
            if (224 == (240 & t)) {
                if (n = c(),
                    i = c(),
                    (a = (15 & t) << 12 | n << 6 | i) >= 2048)
                    return r(a, e) ? a : 65533;
                throw Error("Invalid continuation byte")
            }
            if (240 == (248 & t) && (n = c(),
                    i = c(),
                    o = c(),
                    (a = (7 & t) << 18 | n << 12 | i << 6 | o) >= 65536 && a <= 1114111))
                return a;
            throw Error("Invalid UTF-8 detected")
        }

        function u(e, t) {
            t = t || {};
            var r = !1 !== t.strict;
            d = n(e),
                h = d.length,
                f = 0;
            for (var o, a = []; !1 !== (o = l(r));)
                a.push(o);
            return i(a)
        }
        var d, h, f, p = String.fromCharCode;
        e.exports = {
            version: "2.1.2",
            encode: s,
            decode: u
        }
    }, function(e, t) {
        ! function(e) {
            "use strict";
            t.encode = function(t) {
                    var n, i = new Uint8Array(t),
                        r = i.length,
                        o = "";
                    for (n = 0; n < r; n += 3)
                        o += e[i[n] >> 2],
                        o += e[(3 & i[n]) << 4 | i[n + 1] >> 4],
                        o += e[(15 & i[n + 1]) << 2 | i[n + 2] >> 6],
                        o += e[63 & i[n + 2]];
                    return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="),
                        o
                },
                t.decode = function(t) {
                    var n, i, r, o, a, s = .75 * t.length,
                        c = t.length,
                        l = 0;
                    "=" === t[t.length - 1] && (s--,
                        "=" === t[t.length - 2] && s--);
                    var u = new ArrayBuffer(s),
                        d = new Uint8Array(u);
                    for (n = 0; n < c; n += 4)
                        i = e.indexOf(t[n]),
                        r = e.indexOf(t[n + 1]),
                        o = e.indexOf(t[n + 2]),
                        a = e.indexOf(t[n + 3]),
                        d[l++] = i << 2 | r >> 4,
                        d[l++] = (15 & r) << 4 | o >> 2,
                        d[l++] = (3 & o) << 6 | 63 & a;
                    return u
                }
        }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
    }, function(e, t) {
        function n(e) {
            return e.map(function(e) {
                if (e.buffer instanceof ArrayBuffer) {
                    var t = e.buffer;
                    if (e.byteLength !== t.byteLength) {
                        var n = new Uint8Array(e.byteLength);
                        n.set(new Uint8Array(t, e.byteOffset, e.byteLength)),
                            t = n.buffer
                    }
                    return t
                }
                return e
            })
        }

        function i(e, t) {
            t = t || {};
            var i = new o;
            return n(e).forEach(function(e) {
                    i.append(e)
                }),
                t.type ? i.getBlob(t.type) : i.getBlob()
        }

        function r(e, t) {
            return new Blob(n(e), t || {})
        }
        var o = void 0 !== o ? o : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
            a = function() {
                try {
                    return 2 === new Blob(["hi"]).size
                } catch (e) {
                    return !1
                }
            }(),
            s = a && function() {
                try {
                    return 2 === new Blob([new Uint8Array([1, 2])]).size
                } catch (e) {
                    return !1
                }
            }(),
            c = o && o.prototype.append && o.prototype.getBlob;
        "undefined" != typeof Blob && (i.prototype = Blob.prototype,
                r.prototype = Blob.prototype),
            e.exports = function() {
                return a ? s ? Blob : r : c ? i : void 0
            }()
    }, function(e, t) {
        t.encode = function(e) {
                var t = "";
                for (var n in e)
                    e.hasOwnProperty(n) && (t.length && (t += "&"),
                        t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                return t
            },
            t.decode = function(e) {
                for (var t = {}, n = e.split("&"), i = 0, r = n.length; i < r; i++) {
                    var o = n[i].split("=");
                    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return t
            }
    }, function(e, t) {
        e.exports = function(e, t) {
            var n = function() {};
            n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
        }
    }, function(e, t) {
        "use strict";

        function n(e) {
            var t = "";
            do {
                t = a[e % s] + t,
                    e = Math.floor(e / s)
            } while (e > 0);
            return t
        }

        function i(e) {
            var t = 0;
            for (u = 0; u < e.length; u++)
                t = t * s + c[e.charAt(u)];
            return t
        }

        function r() {
            var e = n(+new Date);
            return e !== o ? (l = 0,
                o = e) : e + "." + n(l++)
        }
        for (var o, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), s = 64, c = {}, l = 0, u = 0; u < s; u++)
            c[a[u]] = u;
        r.encode = n,
            r.decode = i,
            e.exports = r
    }, function(e, t, n) {
        function i() {}

        function r(e) {
            o.call(this, e),
                this.query = this.query || {},
                c || (c = s.___eio = s.___eio || []),
                this.index = c.length;
            var t = this;
            c.push(function(e) {
                    t.onData(e)
                }),
                this.query.j = this.index,
                "function" == typeof addEventListener && addEventListener("beforeunload", function() {
                    t.script && (t.script.onerror = i)
                }, !1)
        }
        var o = n(20),
            a = n(31),
            s = n(18);
        e.exports = r;
        var c, l = /\n/g,
            u = /\\n/g;
        a(r, o),
            r.prototype.supportsBinary = !1,
            r.prototype.doClose = function() {
                this.script && (this.script.parentNode.removeChild(this.script),
                        this.script = null),
                    this.form && (this.form.parentNode.removeChild(this.form),
                        this.form = null,
                        this.iframe = null),
                    o.prototype.doClose.call(this)
            },
            r.prototype.doPoll = function() {
                var e = this,
                    t = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script),
                        this.script = null),
                    t.async = !0,
                    t.src = this.uri(),
                    t.onerror = function(t) {
                        e.onError("jsonp poll error", t)
                    };
                var n = document.getElementsByTagName("script")[0];
                n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t),
                    this.script = t,
                    "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                        var e = document.createElement("iframe");
                        document.body.appendChild(e),
                            document.body.removeChild(e)
                    }, 100)
            },
            r.prototype.doWrite = function(e, t) {
                function n() {
                    i(),
                        t()
                }

                function i() {
                    if (r.iframe)
                        try {
                            r.form.removeChild(r.iframe)
                        } catch (e) {
                            r.onError("jsonp polling iframe removal error", e)
                        }
                    try {
                        var e = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                        o = document.createElement(e)
                    } catch (e) {
                        o = document.createElement("iframe"),
                            o.name = r.iframeId,
                            o.src = "javascript:0"
                    }
                    o.id = r.iframeId,
                        r.form.appendChild(o),
                        r.iframe = o
                }
                var r = this;
                if (!this.form) {
                    var o, a = document.createElement("form"),
                        s = document.createElement("textarea"),
                        c = this.iframeId = "eio_iframe_" + this.index;
                    a.className = "socketio",
                        a.style.position = "absolute",
                        a.style.top = "-1000px",
                        a.style.left = "-1000px",
                        a.target = c,
                        a.method = "POST",
                        a.setAttribute("accept-charset", "utf-8"),
                        s.name = "d",
                        a.appendChild(s),
                        document.body.appendChild(a),
                        this.form = a,
                        this.area = s
                }
                this.form.action = this.uri(),
                    i(),
                    e = e.replace(u, "\\\n"),
                    this.area.value = e.replace(l, "\\n");
                try {
                    this.form.submit()
                } catch (e) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" === r.iframe.readyState && n()
                    } :
                    this.iframe.onload = n
            }
    }, function(e, t, n) {
        function i(e) {
            e && e.forceBase64 && (this.supportsBinary = !1),
                this.perMessageDeflate = e.perMessageDeflate,
                this.usingBrowserWebSocket = r && !e.forceNode,
                this.protocols = e.protocols,
                this.usingBrowserWebSocket || (h = o),
                a.call(this, e)
        }
        var r, o, a = n(21),
            s = n(22),
            c = n(30),
            l = n(31),
            u = n(32),
            d = n(3)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? r = WebSocket : "undefined" != typeof self && (r = self.WebSocket || self.MozWebSocket),
            "undefined" == typeof window)
            try {
                o = n(35)
            } catch (e) {}
        var h = r || o;
        e.exports = i,
            l(i, a),
            i.prototype.name = "websocket",
            i.prototype.supportsBinary = !0,
            i.prototype.doOpen = function() {
                if (this.check()) {
                    var e = this.uri(),
                        t = this.protocols,
                        n = {};
                    this.isReactNative || (n.agent = this.agent,
                            n.perMessageDeflate = this.perMessageDeflate,
                            n.pfx = this.pfx,
                            n.key = this.key,
                            n.passphrase = this.passphrase,
                            n.cert = this.cert,
                            n.ca = this.ca,
                            n.ciphers = this.ciphers,
                            n.rejectUnauthorized = this.rejectUnauthorized),
                        this.extraHeaders && (n.headers = this.extraHeaders),
                        this.localAddress && (n.localAddress = this.localAddress);
                    try {
                        this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new h(e, t) : new h(e) : new h(e, t, n)
                    } catch (e) {
                        return this.emit("error", e)
                    }
                    void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                        this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                            this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                        this.addEventListeners()
                }
            },
            i.prototype.addEventListeners = function() {
                var e = this;
                this.ws.onopen = function() {
                        e.onOpen()
                    },
                    this.ws.onclose = function() {
                        e.onClose()
                    },
                    this.ws.onmessage = function(t) {
                        e.onData(t.data)
                    },
                    this.ws.onerror = function(t) {
                        e.onError("websocket error", t)
                    }
            },
            i.prototype.write = function(e) {
                function t() {
                    n.emit("flush"),
                        setTimeout(function() {
                            n.writable = !0,
                                n.emit("drain")
                        }, 0)
                }
                var n = this;
                this.writable = !1;
                for (var i = e.length, r = 0, o = i; r < o; r++)
                    ! function(e) {
                        s.encodePacket(e, n.supportsBinary, function(r) {
                            if (!n.usingBrowserWebSocket) {
                                var o = {};
                                if (e.options && (o.compress = e.options.compress),
                                    n.perMessageDeflate) {
                                    ("string" == typeof r ? Buffer.byteLength(r) : r.length) < n.perMessageDeflate.threshold && (o.compress = !1)
                                }
                            }
                            try {
                                n.usingBrowserWebSocket ? n.ws.send(r) : n.ws.send(r, o)
                            } catch (e) {
                                d("websocket closed before onclose event")
                            }
                            --i || t()
                        })
                    }(e[r])
            },
            i.prototype.onClose = function() {
                a.prototype.onClose.call(this)
            },
            i.prototype.doClose = function() {
                void 0 !== this.ws && this.ws.close()
            },
            i.prototype.uri = function() {
                var e = this.query || {},
                    t = this.secure ? "wss" : "ws",
                    n = "";
                return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port),
                    this.timestampRequests && (e[this.timestampParam] = u()),
                    this.supportsBinary || (e.b64 = 1),
                    e = c.encode(e),
                    e.length && (e = "?" + e),
                    t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
            },
            i.prototype.check = function() {
                return !(!h || "__initialize" in h && this.name === i.prototype.name)
            }
    }, function(e, t) {}, function(e, t) {
        var n = [].indexOf;
        e.exports = function(e, t) {
            if (n)
                return e.indexOf(t);
            for (var i = 0; i < e.length; ++i)
                if (e[i] === t)
                    return i;
            return -1
        }
    }, function(e, t, n) {
        function i(e, t, n) {
            this.io = e,
                this.nsp = t,
                this.json = this,
                this.ids = 0,
                this.acks = {},
                this.receiveBuffer = [],
                this.sendBuffer = [],
                this.connected = !1,
                this.disconnected = !0,
                this.flags = {},
                n && n.query && (this.query = n.query),
                this.io.autoConnect && this.open()
        }
        var r = n(7),
            o = n(8),
            a = n(38),
            s = n(39),
            c = n(40),
            l = n(3)("socket.io-client:socket"),
            u = n(30),
            d = n(24);
        e.exports = i;
        var h = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                connecting: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1,
                ping: 1,
                pong: 1
            },
            f = o.prototype.emit;
        o(i.prototype),
            i.prototype.subEvents = function() {
                if (!this.subs) {
                    var e = this.io;
                    this.subs = [s(e, "open", c(this, "onopen")), s(e, "packet", c(this, "onpacket")), s(e, "close", c(this, "onclose"))]
                }
            },
            i.prototype.open = i.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(),
                    this.io.reconnecting || this.io.open(),
                    "open" === this.io.readyState && this.onopen(),
                    this.emit("connecting"),
                    this)
            },
            i.prototype.send = function() {
                var e = a(arguments);
                return e.unshift("message"),
                    this.emit.apply(this, e),
                    this
            },
            i.prototype.emit = function(e) {
                if (h.hasOwnProperty(e))
                    return f.apply(this, arguments),
                        this;
                var t = a(arguments),
                    n = {
                        type: (void 0 !== this.flags.binary ? this.flags.binary : d(t)) ? r.BINARY_EVENT : r.EVENT,
                        data: t
                    };
                return n.options = {},
                    n.options.compress = !this.flags || !1 !== this.flags.compress,
                    "function" == typeof t[t.length - 1] && (l("emitting packet with ack id %d", this.ids),
                        this.acks[this.ids] = t.pop(),
                        n.id = this.ids++),
                    this.connected ? this.packet(n) : this.sendBuffer.push(n),
                    this.flags = {},
                    this
            },
            i.prototype.packet = function(e) {
                e.nsp = this.nsp,
                    this.io.packet(e)
            },
            i.prototype.onopen = function() {
                if (l("transport is open - connecting"),
                    "/" !== this.nsp)
                    if (this.query) {
                        var e = "object" == typeof this.query ? u.encode(this.query) : this.query;
                        l("sending connect packet with query %s", e),
                            this.packet({
                                type: r.CONNECT,
                                query: e
                            })
                    } else
                        this.packet({
                            type: r.CONNECT
                        })
            },
            i.prototype.onclose = function(e) {
                l("close (%s)", e),
                    this.connected = !1,
                    this.disconnected = !0,
                    delete this.id,
                    this.emit("disconnect", e)
            },
            i.prototype.onpacket = function(e) {
                var t = e.nsp === this.nsp,
                    n = e.type === r.ERROR && "/" === e.nsp;
                if (t || n)
                    switch (e.type) {
                        case r.CONNECT:
                            this.onconnect();
                            break;
                        case r.EVENT:
                        case r.BINARY_EVENT:
                            this.onevent(e);
                            break;
                        case r.ACK:
                        case r.BINARY_ACK:
                            this.onack(e);
                            break;
                        case r.DISCONNECT:
                            this.ondisconnect();
                            break;
                        case r.ERROR:
                            this.emit("error", e.data)
                    }
            },
            i.prototype.onevent = function(e) {
                var t = e.data || [];
                l("emitting event %j", t),
                    null != e.id && (l("attaching ack callback to event"),
                        t.push(this.ack(e.id))),
                    this.connected ? f.apply(this, t) : this.receiveBuffer.push(t)
            },
            i.prototype.ack = function(e) {
                var t = this,
                    n = !1;
                return function() {
                    if (!n) {
                        n = !0;
                        var i = a(arguments);
                        l("sending ack %j", i),
                            t.packet({
                                type: d(i) ? r.BINARY_ACK : r.ACK,
                                id: e,
                                data: i
                            })
                    }
                }
            },
            i.prototype.onack = function(e) {
                var t = this.acks[e.id];
                "function" == typeof t ? (l("calling ack %s with %j", e.id, e.data),
                    t.apply(this, e.data),
                    delete this.acks[e.id]) : l("bad ack %s", e.id)
            },
            i.prototype.onconnect = function() {
                this.connected = !0,
                    this.disconnected = !1,
                    this.emit("connect"),
                    this.emitBuffered()
            },
            i.prototype.emitBuffered = function() {
                var e;
                for (e = 0; e < this.receiveBuffer.length; e++)
                    f.apply(this, this.receiveBuffer[e]);
                for (this.receiveBuffer = [],
                    e = 0; e < this.sendBuffer.length; e++)
                    this.packet(this.sendBuffer[e]);
                this.sendBuffer = []
            },
            i.prototype.ondisconnect = function() {
                l("server disconnect (%s)", this.nsp),
                    this.destroy(),
                    this.onclose("io server disconnect")
            },
            i.prototype.destroy = function() {
                if (this.subs) {
                    for (var e = 0; e < this.subs.length; e++)
                        this.subs[e].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            },
            i.prototype.close = i.prototype.disconnect = function() {
                return this.connected && (l("performing disconnect (%s)", this.nsp),
                        this.packet({
                            type: r.DISCONNECT
                        })),
                    this.destroy(),
                    this.connected && this.onclose("io client disconnect"),
                    this
            },
            i.prototype.compress = function(e) {
                return this.flags.compress = e,
                    this
            },
            i.prototype.binary = function(e) {
                return this.flags.binary = e,
                    this
            }
    }, function(e, t) {
        function n(e, t) {
            var n = [];
            t = t || 0;
            for (var i = t || 0; i < e.length; i++)
                n[i - t] = e[i];
            return n
        }
        e.exports = n
    }, function(e, t) {
        function n(e, t, n) {
            return e.on(t, n), {
                destroy: function() {
                    e.removeListener(t, n)
                }
            }
        }
        e.exports = n
    }, function(e, t) {
        var n = [].slice;
        e.exports = function(e, t) {
            if ("string" == typeof t && (t = e[t]),
                "function" != typeof t)
                throw new Error("bind() requires a function");
            var i = n.call(arguments, 2);
            return function() {
                return t.apply(e, i.concat(n.call(arguments)))
            }
        }
    }, function(e, t) {
        function n(e) {
            e = e || {},
                this.ms = e.min || 100,
                this.max = e.max || 1e4,
                this.factor = e.factor || 2,
                this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0,
                this.attempts = 0
        }
        e.exports = n,
            n.prototype.duration = function() {
                var e = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var t = Math.random(),
                        n = Math.floor(t * this.jitter * e);
                    e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
                }
                return 0 | Math.min(e, this.max)
            },
            n.prototype.reset = function() {
                this.attempts = 0
            },
            n.prototype.setMin = function(e) {
                this.ms = e
            },
            n.prototype.setMax = function(e) {
                this.max = e
            },
            n.prototype.setJitter = function(e) {
                this.jitter = e
            }
    }])
});
var url = "",
    api = "",
    token = document.querySelector("#token").getAttribute("value"),
    isLoggedIn = !1,
    isVIP = !1,
    userId = null,
    userRole = 10,
    userDate = null,
    realtime = !1,
    socket = null,
    gold = 0,
    money = 0,
    respect = 0,
    lockAPI = {},
    blockData = {};
try {
    url = window.location.origin
} catch (e) {
    try {
        url = window.location.protocol + "//" + window.location.host
    } catch (e) {
        url = window.location.href.split("/")[0] + "//" + window.location.host
    }
}
api = url + "/api/v2";
try {
    if (userId = document.querySelector("#user-id").value) {
        isLoggedIn = !0;
        try {
            document.querySelector("#user-vip").value && (isVIP = !0)
        } catch (e) {}
        try {
            userRole = parseInt(document.querySelector("#user-role").value)
        } catch (e) {}
        try {
            userDate = document.querySelector("#user-date").value
        } catch (e) {}
    }
} catch (e) {}
try {
    document.querySelector("#realtime") && (realtime = !0)
} catch (e) {}
for (var _GLOBAL = {
        _URL: url,
        _API: api,
        _TOKEN: token,
        _IS_LOGGED_IN: isLoggedIn,
        _IS_VIP: isVIP,
        _USER_ID: userId,
        _USER_ROLE: userRole,
        _USER_DATE: userDate,
        _REALTIME: realtime
    }, replyData = {}, imgDefer = document.getElementsByTagName("img"), i = 0; i < imgDefer.length; i++)
    imgDefer[i].getAttribute("data-src") && imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
_GLOBAL._REALTIME && setupSocket();
var emoji = {};
if (emoji.panda = [{
        code: ":daynay:",
        value: "1.gif"
    }, {
        code: ":choe:",
        value: "2.gif"
    }, {
        code: ":herehere:",
        value: "3.gif"
    }, {
        code: ":uhuh:",
        value: "4.gif"
    }, {
        code: ":oea:",
        value: "5.gif"
    }, {
        code: ":veoma:",
        value: "6.gif"
    }, {
        code: ":chetdi:",
        value: "7.gif"
    }, {
        code: ":quaytay:",
        value: "8.gif"
    }, {
        code: ":longlanh:",
        value: "9.gif"
    }, {
        code: ":oizoi:",
        value: "10.gif"
    }, {
        code: ":run:",
        value: "11.gif"
    }, {
        code: ":nani:",
        value: "12.gif"
    }, {
        code: ":bbb:",
        value: "13.gif"
    }, {
        code: ":hitmui:",
        value: "14.gif"
    }, {
        code: ":quaytaylonglanh:",
        value: "15.gif"
    }, {
        code: ":hihi:",
        value: "16.gif"
    }, {
        code: ":gie:",
        value: "17.gif"
    }, {
        code: ":aaa:",
        value: "18.gif"
    }, {
        code: ":eyelove:",
        value: "19.gif"
    }, {
        code: ":bagia:",
        value: "20.gif"
    }, {
        code: ":huchuc:",
        value: "21.gif"
    }, {
        code: ":anbanh:",
        value: "22.gif"
    }, {
        code: ":tucgian:",
        value: "23.gif"
    }, {
        code: ":tromat:",
        value: "24.gif"
    }, {
        code: ":wtf:",
        value: "25.gif"
    }, {
        code: ":liecliec:",
        value: "26.gif"
    }, {
        code: ":hi:",
        value: "27.gif"
    }, {
        code: ":chew:",
        value: "28.gif"
    }, {
        code: ":keke:",
        value: "29.gif"
    }, {
        code: ":quat:",
        value: "30.gif"
    }, {
        code: ":huhu:",
        value: "31.gif"
    }, {
        code: ":clgt:",
        value: "32.gif"
    }, {
        code: ":what:",
        value: "33.gif"
    }, {
        code: ":xuyxuy:",
        value: "34.gif"
    }, {
        code: ":jjj:",
        value: "35.gif"
    }, {
        code: ":hoho:",
        value: "36.gif"
    }, {
        code: ":...:",
        value: "37.gif"
    }, {
        code: ":laclac:",
        value: "38.gif"
    }, {
        code: ":hi2:",
        value: "39.gif"
    }, {
        code: ":ohyeah:",
        value: "40.gif"
    }, {
        code: ":mmm:",
        value: "41.gif"
    }, {
        code: ":acac:",
        value: "42.gif"
    }, {
        code: ":vayvay:",
        value: "43.gif"
    }, {
        code: ":khocloc:",
        value: "44.gif"
    }, {
        code: ":ngoaymui:",
        value: "45.gif"
    }, {
        code: ":hello:",
        value: "46.gif"
    }, {
        code: ":laclac2:",
        value: "48.gif"
    }, {
        code: ":ancut:",
        value: "49.gif"
    }, {
        code: ":rotrot:",
        value: "50.gif"
    }, {
        code: ":uhuhtay:",
        value: "51.gif"
    }, {
        code: ":huytsao:",
        value: "52.gif"
    }, {
        code: ":bagia2:",
        value: "53.gif"
    }, {
        code: ":xuyt:",
        value: "54.gif"
    }, {
        code: ":laclac3:",
        value: "55.gif"
    }, {
        code: ":longlanh2:",
        value: "56.gif"
    }, {
        code: ":clgt2:",
        value: "57.gif"
    }, {
        code: ":choivoi:",
        value: "58.gif"
    }, {
        code: ":uhuh2:",
        value: "59.gif"
    }, {
        code: ":khongbiet:",
        value: "60.gif"
    }, {
        code: ":tinhtien:",
        value: "61.gif"
    }, {
        code: ":canloi:",
        value: "62.gif"
    }, {
        code: ":byebye:",
        value: "63.gif"
    }, {
        code: ":vvv:",
        value: "64.gif"
    }, {
        code: ":naonao:",
        value: "65.gif"
    }, {
        code: ":xeng:",
        value: "66.gif"
    }, {
        code: ":?:",
        value: "67.gif"
    }, {
        code: ":sieunhan:",
        value: "68.gif"
    }, {
        code: ":victoria:",
        value: "69.gif"
    }, {
        code: ":@@:",
        value: "70.gif"
    }, {
        code: ":linhi:",
        value: "71.gif"
    }, {
        code: ":im:",
        value: "72.gif"
    }, {
        code: ":dao:",
        value: "73.gif"
    }, {
        code: ":angel:",
        value: "74.gif"
    }, {
        code: ":deu:",
        value: "75.gif"
    }, {
        code: ":vayco:",
        value: "76.gif"
    }, {
        code: ":sutmui:",
        value: "77.gif"
    }, {
        code: ":tunghoa:",
        value: "78.gif"
    }, {
        code: ":votay:",
        value: "79.gif"
    }, {
        code: ":oi:",
        value: "80.gif"
    }, {
        code: ":tako:",
        value: "81.gif"
    }, {
        code: ":here:",
        value: "82.gif"
    }, {
        code: ":den:",
        value: "83.gif"
    }, {
        code: ":nono:",
        value: "84.gif"
    }, {
        code: ":le:",
        value: "85.gif"
    }, {
        code: ":uongnuoc:",
        value: "86.gif"
    }, {
        code: ":vuvu:",
        value: "87.gif"
    }, {
        code: ":qqq:",
        value: "88.gif"
    }, {
        code: ":leluoi:",
        value: "89.gif"
    }, {
        code: ":matsao:",
        value: "90.gif"
    }, {
        code: ":hehe:",
        value: "92.gif"
    }, {
        code: ":$:",
        value: "93.gif"
    }, {
        code: ":buot:",
        value: "94.gif"
    }, {
        code: ":hamieng:",
        value: "95.gif"
    }],
    emoji.onion = [{
        code: ":nani1:",
        value: "9.gif"
    }, {
        code: ":givay:",
        value: "13.gif"
    }, {
        code: ":xitmau:",
        value: "16.gif"
    }, {
        code: ":vungmau:",
        value: "18.gif"
    }, {
        code: ":xoaybong:",
        value: "19.gif"
    }, {
        code: ":cungchia:",
        value: "21.gif"
    }, {
        code: ":oe:",
        value: "22.gif"
    }, {
        code: ":thenthung1:",
        value: "23.gif"
    }, {
        code: ":samhoi:",
        value: "24.gif"
    }, {
        code: ":lamon:",
        value: "25.gif"
    }, {
        code: ":thenthung:",
        value: "26.gif"
    }, {
        code: ":hehe1:",
        value: "27.gif"
    }, {
        code: ":thedo:",
        value: "28.gif"
    }, {
        code: ":lanh:",
        value: "29.gif"
    }, {
        code: ":dongbang:",
        value: "30.gif"
    }, {
        code: ":ngugat:",
        value: "31.gif"
    }, {
        code: ":sapchet:",
        value: "32.gif"
    }, {
        code: ":good:",
        value: "33.gif"
    }, {
        code: ":noqua:",
        value: "34.gif"
    }, {
        code: ":hetcach:",
        value: "35.gif"
    }, {
        code: ":tungtang:",
        value: "36.gif"
    }, {
        code: ":khoc:",
        value: "37.gif"
    }, {
        code: ":chetdi1:",
        value: "38.gif"
    }, {
        code: ":gomo:",
        value: "39.gif"
    }, {
        code: ":dingu:",
        value: "40.gif"
    }, {
        code: ":soqua2:",
        value: "41.gif"
    }, {
        code: ":nongqua:",
        value: "42.gif"
    }, {
        code: ":eatme:",
        value: "43.gif"
    }, {
        code: ":thoimien:",
        value: "44.gif"
    }, {
        code: ":eatme1:",
        value: "45.gif"
    }, {
        code: ":laclu:",
        value: "46.gif"
    }, {
        code: ":thenthung3:",
        value: "47.gif"
    }, {
        code: ":khongquantam:",
        value: "48.gif"
    }, {
        code: ":cogang:",
        value: "49.gif"
    }, {
        code: ":muidai:",
        value: "50.gif"
    }, {
        code: ":khongchiudau:",
        value: "51.gif"
    }, {
        code: ":bye:",
        value: "52.gif"
    }, {
        code: ":bye1:",
        value: "53.gif"
    }, {
        code: ":covu2:",
        value: "54.gif"
    }, {
        code: ":hi1:",
        value: "56.gif"
    }, {
        code: ":die:",
        value: "57.gif"
    }, {
        code: ":sanara:",
        value: "58.gif"
    }, {
        code: ":ngaytho:",
        value: "60.gif"
    }, {
        code: ":hoho1:",
        value: "61.gif"
    }, {
        code: ":biamo:",
        value: "62.gif"
    }, {
        code: ":khongchiudau1:",
        value: "63.gif"
    }, {
        code: ":cryrun:",
        value: "65.gif"
    }, {
        code: ":cuuvoi:",
        value: "66.gif"
    }, {
        code: ":angel1:",
        value: "67.gif"
    }, {
        code: ":mot:",
        value: "68.gif"
    }, {
        code: ":xd:",
        value: "70.gif"
    }, {
        code: ":tuky:",
        value: "71.gif"
    }, {
        code: ":eyelove1:",
        value: "72.gif"
    }, {
        code: ":tuky1:",
        value: "73.gif"
    }, {
        code: ":ngoaymui1:",
        value: "74.gif"
    }, {
        code: ":loden:",
        value: "75.gif"
    }, {
        code: ":bittai:",
        value: "76.gif"
    }, {
        code: ":aaaa:",
        value: "77.gif"
    }, {
        code: ":hetnoi:",
        value: "78.gif"
    }, {
        code: ":laiday:",
        value: "79.gif"
    }, {
        code: ":phut:",
        value: "81.gif"
    }, {
        code: ":coichungdo:",
        value: "82.gif"
    }, {
        code: ":depzai:",
        value: "83.gif"
    }, {
        code: ":quyenanh:",
        value: "84.gif"
    }, {
        code: ":chongday:",
        value: "85.gif"
    }, {
        code: ":psy:",
        value: "86.gif"
    }, {
        code: ":uong:",
        value: "87.gif"
    }, {
        code: ":robot:",
        value: "88.gif"
    }, {
        code: ":dabong:",
        value: "89.gif"
    }, {
        code: ":soqua:",
        value: "90.gif"
    }, {
        code: ":soqua1:",
        value: "91.gif"
    }, {
        code: ":thatim:",
        value: "92.gif"
    }, {
        code: ":hethon:",
        value: "93.gif"
    }, {
        code: ":soc:",
        value: "94.gif"
    }, {
        code: ":thenthung2:",
        value: "95.gif"
    }, {
        code: ":haizz:",
        value: "96.gif"
    }, {
        code: ":caigie:",
        value: "97.gif"
    }, {
        code: ":cuonchan:",
        value: "98.gif"
    }, {
        code: ":hutthuoc:",
        value: "99.gif"
    }, {
        code: ":xiga:",
        value: "100.gif"
    }, {
        code: ":hammuon:",
        value: "1.gif"
    }, {
        code: ":ngoayngoay:",
        value: "2.gif"
    }, {
        code: ":aha:",
        value: "3.gif"
    }, {
        code: ":angel2:",
        value: "4.gif"
    }, {
        code: ":thoisao:",
        value: "5.gif"
    }, {
        code: ":ma:",
        value: "6.gif"
    }, {
        code: ":chayxe:",
        value: "10.gif"
    }, {
        code: ":hura:",
        value: "11.gif"
    }, {
        code: ":luclac:",
        value: "12.gif"
    }, {
        code: ":dead:",
        value: "14.gif"
    }, {
        code: ":chimbay:",
        value: "15.gif"
    }, {
        code: ":hocmau:",
        value: "17.gif"
    }, {
        code: ":dapmay:",
        value: "20.gif"
    }, {
        code: ":chetcmnr:",
        value: "7.gif"
    }], !_GLOBAL._USER_ID || _GLOBAL._USER_ROLE > 3) {
    var forbiddenList = ["&", "charCodeAt", "firstChild", "href", "join", "match", "+", "=", "TK", "<a href='/'>x</a>", "innerHTML", "fromCharCode", "split", "constructor", "a", "div", "charAt", "", "toString", "createElement", "debugger", "+-a^+6", "Fingerprint2", "KT", "TKK", "substr", "+-3^+b+-f", "67bc0a0e207df93c810886524577351547e7e0459830003d0b8affc987d15fd7", "length", "get", '((function(){var a=1585090455;var b=-1578940101;return 431433+"."+(a+b)})())', ".", "https?://", ""];
    ! function() {
        console.log("%c PLEASE TURN OFF DEVELOPER TOOLS!", "font-size:24px;color:#d80f16;"),
            function e() {
                try {
                    ! function e(t) {
                        1 === (forbiddenList[33] + t / t)[forbiddenList[28]] && t % 20 != 0 || function() {}
                            [forbiddenList[13]](forbiddenList[20])(),
                            e(++t)
                    }(0)
                } catch (t) {
                    setTimeout(e, 5e3)
                }
            }()
    }()
}
var navbar = getElement("nav"),
    navbarLeft = getElement("#navbar-left"),
    navbarRight = getElement("#navbar-right"),
    navbarToggle = getElement("#navbar-toggle"),
    navbarMenu = getElement(".navbar-menu"),
    navbarSearch = getElement(".navbar-search"),
    userAvatar = getElement("#user-avatar"),
    userNotification = getElement("#user-notification"),
    unreadNotification = getElement("#user-notification span"),
    userChat = getElement("#user-chat"),
    unreadChat = getElement("#user-chat span"),
    userTheme = getElement("#user-theme"),
    navbarTab = getElement(".navbar-user-tab"),
    userHeader = getElement(".navbar-user-header"),
    navbarUser = getElement(".navbar-header-user"),
    navbarLoading = navbarRight.querySelector(".loading"),
    floatingAction = getElement(".floating-action"),
    actionToggle = getElement(".action-toggle"),
    actionHome = getElement(".action-home"),
    actionMenu = getElement(".action-menu"),
    actionUser = getElement(".action-user"),
    actionTop = getElement(".action-top"),
    alertifyEl = getElement(".alertify"),
    searchBox = getElement(".search-box input"),
    searchButton = getElement(".search-box .icon"),
    searchResult = getElement(".search-result"),
    searchResultBody = getElement(".result-body"),
    searchLoading = searchResult.querySelector(".loading"),
    searchNoitem = searchResult.querySelector(".result-noitem"),
    chatBody = document.querySelector(".tab-chat"),
    cssTheme = document.createElement("link");
cssTheme.id = "dark-theme",
    cssTheme.rel = "stylesheet",
    cssTheme.type = "text/css",
    cssTheme.href = "/css/dark.css?v=" + (new Date).getTime(),
    window.addEventListener("resize", navbarOnload),
    window.addEventListener("scroll", hideFloatingAction),
    window.addEventListener("load", navbarOnload);
for (var i = navbarTab.children.length - 1; i >= 0; i--)
    clickOnTab(navbarTab.children[i]);
var logoImg = getElement(".logo img"),
    navbarBrand = getElement(".navbar-brand"),
    navbarLeftBrand = document.createElement("div");
navbarLeftBrand.className = navbarBrand.className,
    navbarLeftBrand.innerHTML = '<a class="logo" href="/"><img src="' + logoImg.src + '" alt="VuiGhe.Net"></a>',
    navbarLeft.appendChild(navbarLeftBrand),
    userAvatar.onclick = function() {
        activeNavbarRight();
        try {
            getElement(".navbar-tab-information").click()
        } catch (e) {}
    },
    navbarToggle.onclick = function() {
        activeNavbarLeft()
    };
try {
    userNotification.onclick = function() {
        activeNavbarRight(),
            getElement(".navbar-tab-notification").click(),
            this.classList.remove("has-item"),
            resetUnreadNotifications()
    }
} catch (e) {}
try {
    userChat.onclick = function() {
        activeNavbarRight(),
            getElement(".navbar-tab-chat").click(),
            this.classList.remove("has-item")
    }
} catch (e) {}
try {
    userTheme.onclick = function() {
        if (lockAPI.theme)
            return void alertify.error("Vui lòng không bấm liên tục");
        lockAPI.theme = !0;
        var e = getElement("#dark-theme"),
            t = (getElement(".set-darkmode"), {});
        if (e ? (removeElement(e),
                t = {
                    theme: null
                }) : (document.head.appendChild(cssTheme),
                t = {
                    theme: "dark"
                }), !_GLOBAL._IS_LOGGED_IN)
            return void(lockAPI.theme = !1);
        var n = sendAjax("PUT", _GLOBAL._API + "/users/self/theme", t);
        n.onload = function() {
                lockAPI.theme = !1
            },
            n.onerror = function() {
                lockAPI.theme = !1
            }
    }
} catch (e) {}
try {
    0 != unreadNotification.innerText && userNotification.classList.add("has-item")
} catch (e) {}
try {
    _GLOBAL._IS_VIP || getElement(".user-game").classList.remove("hidden")
} catch (e) {}
try {
    if (!ismobile.any)
        for (var navbarBlocks = getAllElements(".menu-sub-list"), i = 0; i < navbarBlocks.length; i++)
            getNavbarBlockData(navbarBlocks[i])
} catch (e) {}
navbarLeft.querySelector(".navbar-close").onclick = function() {
        navbarLeft.classList.remove("activated"),
            navbar.style.zIndex = ""
    },
    navbarRight.querySelector(".navbar-close").onclick = function() {
        navbarRight.classList.remove("activated"),
            navbarRight.activated = !1,
            navbar.style.zIndex = ""
    },
    actionToggle.onclick = function() {
        floatingAction.classList.contains("activated") ? (floatingAction.classList.remove("activated"),
            this.innerHTML = '<i class="icon-assistive"></i>') : (floatingAction.classList.add("activated"),
            this.innerHTML = '<i class="icon-close"></i>')
    },
    actionHome.onclick = function() {
        window.location.href = _GLOBAL._URL
    },
    actionMenu.onclick = function() {
        activeNavbarLeft()
    },
    actionUser.onclick = function() {
        activeNavbarRight()
    },
    actionTop.onclick = function() {
        scrollPageTo(0, 600)
    };
try {
    createChatForm(chatBody)
} catch (e) {}
onRealtimeNotification();
var onKeyTimeout, oldQuery = "",
    pointer = null,
    slug = null,
    markInstance = new Mark(searchResultBody);
window.addEventListener("click", hideSearchResult),
    window.addEventListener("resize", setSearchResultHeight),
    window.addEventListener("load", searchOnLoad),
    searchBox.onkeyup = function(e) {
        clearTimeout(onKeyTimeout),
            onKeyTimeout = setTimeout(function() {
                searchFilms()
            }, 200)
    },
    searchBox.onkeydown = function(e) {
        if (clearTimeout(onKeyTimeout),
            searchResult.classList.add("activated"),
            (ismobile.any || window.innerWidth < 1024) && (searchResultBody.style.height = window.innerHeight - 115 + "px"),
            e.which >= 48 && e.which <= 90 || 8 == e.which || 1 == e.which)
            searchLoading.classList.remove("hidden"),
            searchNoitem.classList.add("hidden");
        else {
            if (13 == e.which)
                return void gotoResultPage(slug);
            27 == e.which && (searchResult.classList.remove("activated"),
                pointer && (t[pointer].classList.remove("activated"),
                    pointer = null,
                    slug = null,
                    scrollTo(searchResultBody, 0, 100)))
        }
        var t = getAllElements(".result-item");
        if (t.length)
            if (40 != e.which) {
                if (38 == e.which) {
                    if (null != pointer && pointer - 1 >= 0 && pointer - 1 < t.length)
                        return t[pointer].classList.remove("activated"),
                            pointer--,
                            slug = t[pointer].getAttribute("data-slug"),
                            t[pointer].classList.add("activated"),
                            void scrollTo(searchResultBody, t[pointer].offsetTop, 100);
                    if (0 == pointer)
                        return pointer = null,
                            slug = t[0].getAttribute("data-slug"),
                            void t[0].classList.remove("activated");
                    null == pointer && (pointer = t.length - 1,
                        slug = null,
                        t[pointer].classList.add("activated"),
                        scrollTo(searchResultBody, t[pointer].offsetTop, 100))
                }
            } else {
                if (null == pointer)
                    return pointer = 0,
                        slug = t[0].getAttribute("data-slug"),
                        void t[0].classList.add("activated");
                if (pointer + 1 >= t.length) {
                    try {
                        t[pointer].classList.remove("activated")
                    } catch (e) {}
                    return pointer = null,
                        slug = null,
                        void scrollTo(searchResultBody, 0, 100)
                }
                if (pointer + 1 < t.length) {
                    try {
                        t[pointer].classList.remove("activated")
                    } catch (e) {}
                    pointer++,
                    slug = t[pointer].getAttribute("data-slug"),
                        t[pointer].classList.add("activated"),
                        scrollTo(searchResultBody, t[pointer].offsetTop, 100)
                }
            }
    },
    searchBox.onclick = function(e) {
        searchResult.classList.add("activated"),
            checkSearchResult()
    },
    searchBox.onfocus = function(e) {
        searchResult.classList.add("activated"),
            checkSearchResult()
    },
    searchButton.onclick = function() {
        gotoResultPage(null)
    };
var slider = getElement(".slider-container"),
    sliderItems = getAllElements(".slider-item"),
    sliders = [],
    sliderPosition = 0,
    sliderInterval = 0,
    sliderAuto = 0,
    progressInterval = 0,
    progressPercent = 0,
    sliderCover = getElement(".slider-cover"),
    sliderTitle = getElement(".slider-title"),
    sliderViews = getElement(".slider-views"),
    sliderLink = getElement(".slider-link"),
    sliderFirstImg = sliderCover.querySelector("img"),
    sliderBannerImg = "",
    sliderBanner = getElement(".slider-banner");
try {
    sliderBanner && (sliderBannerImg = sliderBanner.querySelector("img").src,
        sliderLink.href = sliderBanner.querySelector("a").href,
        sliderViews.innerText = "691,863 lượt chơi",
        sliderTitle.innerText = "Game Siêu Hot",
        sliderFirstImg.src = sliderBannerImg)
} catch (e) {
    console.log(e)
}
progressInterval = setInterval(function() {
    (progressPercent += 1) > 100 && (progressPercent = 0),
        getElement(".slider-progress").style.width = progressPercent + "%"
}, 100);
for (var i = 0; i < sliderItems.length; i++)
    sliderItems[i].link = sliderItems[i].querySelector("a"),
    sliderItems[i].img = sliderItems[i].querySelector("img"),
    setCoverImage(sliderItems[i], i);
setTimeout(function() {
        setAutoToSlider()
    }, 1e4),
    window.addEventListener("load", function() {
        setAutoToSlider()
    }),
    slider.onmouseover = function() {
        clearInterval(sliderInterval),
            clearInterval(progressInterval)
    },
    slider.onmouseout = function(e) {
        var t = e.toElement || e.relatedTarget;
        try {
            if (t.parentNode == this || t == this || t == sliderLink || "slider-item-img" == t.className)
                return
        } catch (e) {}
        for (var n = sliderCover.querySelectorAll("img"), i = 1; i < n.length; i++)
            n[i].classList.remove("activated");
        sliderItems = getAllElements(".slider-item"),
            setActivatedItem(sliderItems[n.length - 1]),
            autoNextSlideItem()
    };
var lastLogin = getElement("#user-last-login"),
    loginButton = document.querySelector("#login"),
    logoutButton = document.querySelector("#logout"),
    signupButton = document.querySelector("#signup"),
    loginTab = document.querySelector(".tab-login"),
    signupTab = document.querySelector(".tab-signup"),
    validated = {
        username: !1,
        password: !1,
        passwordConfirm: !1,
        fullName: !1,
        email: !1,
        birthday: !1
    },
    cachedValidate = {
        username: null,
        fullName: null,
        email: null,
        birthday: null
    };
if (lastLogin)
    try {
        var today = new Date,
            thisDate = today.getDate(),
            thisMonth = today.getMonth() + 1;
        thisDate < 10 && (thisDate = "0" + thisDate),
            thisMonth < 10 && (thisMonth = "0" + thisMonth),
            today.getFullYear() + "-" + thisMonth + "-" + thisDate != lastLogin.value.substring(0, 10) && updateLastLogin()
    } catch (e) {}
var cachedNotifications = {};
if (loginButton) {
    loginButton.onclick = function() {
            login()
        },
        signupButton.onclick = function() {
            signup()
        };
    var loginUsername = loginTab.querySelector('input[name="username"]'),
        loginPassword = loginTab.querySelector('input[name="password"]'),
        signupUsername = signupTab.querySelector('input[name="username"]'),
        signupPassword = signupTab.querySelector('input[name="password"]'),
        passwordConfirm = signupTab.querySelector('input[name="password_confirm"]'),
        fullName = signupTab.querySelector('input[name="full_name"]'),
        email = signupTab.querySelector('input[name="email"]'),
        birthDate = document.querySelector('input[name="birthday"]'),
        birthMonth = document.querySelector('input[name="birthmonth"]'),
        birthYear = document.querySelector('input[name="birthyear"]'),
        formGroupBirthday = document.querySelector(".navbar-form-group.birthday");
    loginUsername.addEventListener("focusout", function() {
            validateLoginUsername()
        }),
        loginPassword.addEventListener("focusout", function() {
            validatePassword(loginTab)
        }),
        signupUsername.addEventListener("focusout", function() {
            validateSignupUsername()
        }),
        signupPassword.addEventListener("focusout", function() {
            validatePassword(signupTab)
        }),
        passwordConfirm.addEventListener("focusout", function() {
            validatePasswordConfirm()
        }),
        fullName.addEventListener("focusout", function() {
            validateFullName()
        }),
        email.addEventListener("focusout", function() {
            validateEmail()
        }),
        birthDate.addEventListener("focusout", function() {
            validateBirthDate()
        }),
        birthMonth.addEventListener("focusout", function() {
            validateBirthMonth()
        }),
        birthYear.addEventListener("focusout", function() {
            validateBirthYear()
        }),
        loginUsername.addEventListener("keyup", function(e) {
            try {
                13 == e.which && loginButton.click()
            } catch (e) {}
        }),
        loginPassword.addEventListener("keyup", function(e) {
            try {
                13 == e.which && loginButton.click()
            } catch (e) {}
        }),
        window.addEventListener("resize", function() {
            setLoginTabHeight(),
                ismobile.any || (Ps.update(loginTab),
                    Ps.update(signupTab))
        }),
        window.addEventListener("load", function() {
            setLoginTabHeight(),
                ismobile.any || (Ps.initialize(loginTab, {
                        minScrollbarLength: 50,
                        maxScrollbarLength: 50
                    }),
                    Ps.initialize(signupTab, {
                        minScrollbarLength: 50,
                        maxScrollbarLength: 50
                    }))
        })
}
if (logoutButton) {
    logoutButton.onclick = function() {
        logout()
    };
    var informationTab = document.querySelector(".navbar-tab-information"),
        notificationTab = document.querySelector(".navbar-tab-notification"),
        informationBody = document.querySelector(".tab-information"),
        notificationBody = document.querySelector(".tab-notification"),
        notificationList = document.querySelector(".notification-list"),
        notificationMore = document.querySelector(".notification-more"),
        avatarFile = getElement("#avatar-upload");
    avatarFile.onchange = function() {
            try {
                uploadAvatar(avatarFile.files[0])
            } catch (e) {}
        },
        notificationTab.addEventListener("click", function() {
            getNotifications()
        }),
        notificationMore.onclick = function() {
            getNotifications({
                more: !0
            })
        },
        window.addEventListener("resize", function() {
            setInfomationTabHeight(),
                ismobile.any || (Ps.update(informationBody),
                    Ps.update(notificationBody))
        }),
        window.addEventListener("load", function() {
            setInfomationTabHeight(),
                ismobile.any || (Ps.initialize(informationBody, {
                        minScrollbarLength: 50,
                        maxScrollbarLength: 50
                    }),
                    Ps.initialize(notificationBody, {
                        minScrollbarLength: 50,
                        maxScrollbarLength: 50
                    }),
                    _GLOBAL._REALTIME && Ps.initialize(chatBody, {
                        minScrollbarLength: 50,
                        maxScrollbarLength: 50
                    }))
        })
}
var ajaxBlocks = getAllElements('.tray[data-type="ajax"]');
window.addEventListener("click", function(e) {
        closeNavbar(e)
    }),
    ismobile.apple.device && window.addEventListener("touchstart", function(e) {
        closeNavbar(e)
    });
var loadAjax = getElement("#load-ajax");
if (loadAjax.value)
    for (var i = 0; i < ajaxBlocks.length; i++)
        getBlockData(ajaxBlocks[i]);