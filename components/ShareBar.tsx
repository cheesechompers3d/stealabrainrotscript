import { useState, useEffect } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaRedditAlien, FaShareAlt, FaBlogger, FaBuffer, FaCopy, FaEnvelope, FaSkype, FaTumblr, FaViber, FaVk, FaWeibo, FaWordpress, FaXing, FaYahoo, FaPinterest, FaTelegram, FaQq, FaPrint, FaLine, FaWeixin, FaGithub, FaTimes } from 'react-icons/fa'
import { SiBluesky, SiDiaspora, SiDigg, SiDouban, SiEvernote, SiFlipboard, SiGmail, SiGoogle, SiHouzz, SiInstapaper, SiKakao, SiLivejournal, SiMaildotru, SiMessenger, SiNaver, SiNextdoor, SiOdnoklassniki, SiPinboard, SiPlurk, SiQzone, SiRenren, SiTrello, SiThreema } from 'react-icons/si'

interface ShareBarProps {
  title: string
  url: string
}

// 定义平台图标映射
const platformIcons = {
  GitHub: <FaGithub />,
  Blogger: <FaBlogger />,
  Bluesky: <SiBluesky />,
  Buffer: <FaBuffer />,
  Copy: <FaCopy />,
  Diaspora: <SiDiaspora />,
  Digg: <SiDigg />,
  Diigo: <FaShareAlt />,
  Douban: <SiDouban />,
  Email: <FaEnvelope />,
  Evernote: <SiEvernote />,
  Facebook: <FaFacebookF />,
  Fark: <FaShareAlt />,
  Flipboard: <SiFlipboard />,
  Gab: <FaShareAlt />,
  Getpocket: <FaShareAlt />,
  Gmail: <SiGmail />,
  Googlebookmarks: <SiGoogle />,
  Hackernews: <FaShareAlt />,
  Houzz: <SiHouzz />,
  Instapaper: <SiInstapaper />,
  Iorbix: <FaShareAlt />,
  Kakao: <SiKakao />,
  Kindleit: <FaShareAlt />,
  Kooapp: <FaShareAlt />,
  Line: <FaLine />,
  LinkedIn: <FaLinkedinIn />,
  Livejournal: <SiLivejournal />,
  Mailru: <SiMaildotru />,
  Meneame: <FaShareAlt />,
  Messenger: <SiMessenger />,
  Microsoftteams: <FaShareAlt />,
  Naver: <SiNaver />,
  Nextdoor: <SiNextdoor />,
  Odnoklassniki: <SiOdnoklassniki />,
  Outlook: <FaShareAlt />,
  Pinboard: <SiPinboard />,
  Pinterest: <FaPinterest />,
  Plurk: <SiPlurk />,
  Print: <FaPrint />,
  Qzone: <SiQzone />,
  Reddit: <FaRedditAlien />,
  Refind: <FaShareAlt />,
  Renren: <SiRenren />,
  Skype: <FaSkype />,
  Surfingbird: <FaShareAlt />,
  Telegram: <FaTelegram />,
  Tencentqq: <FaQq />,
  Threema: <SiThreema />,
  Trello: <SiTrello />,
  Tumblr: <FaTumblr />,
  Twitter: <FaTwitter />,
  Vk: <FaVk />,
  Viber: <FaViber />,
  Wechat: <FaWeixin />,
  Weibo: <FaWeibo />,
  WhatsApp: <FaWhatsapp />,
  Wordpress: <FaWordpress />,
  Xing: <FaXing />,
  Yahoomail: <FaYahoo />,
  Yummly: <FaShareAlt />
}

// 获取平台图标，如果不存在则使用默认图标
const getPlatformIcon = (platformName: string) => {
  return platformIcons[platformName as keyof typeof platformIcons] || <FaShareAlt />
}

const mainPlatforms = [
  {
    name: 'Facebook',
    bg: 'bg-[#3b5998]',
    href: (url: string, title: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Twitter',
    bg: 'bg-[#1da1f2]',
    href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'LinkedIn',
    bg: 'bg-[#0077b5]',
    href: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: 'WhatsApp',
    bg: 'bg-[#25d366]',
    href: (url: string, title: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  {
    name: 'Reddit',
    bg: 'bg-[#ff4500]',
    href: (url: string, title: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
]

// 所有平台列表，按图片中的顺序排列
const allPlatforms = [
  { name: 'GitHub', bg: 'bg-black', href: (url: string, title: string) => `https://github.com/login?return_to=${encodeURIComponent(url)}` },
  { name: 'Blogger', bg: 'bg-orange-500', href: (url: string, title: string) => `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(url)}&n=${encodeURIComponent(title)}` },
  { name: 'Bluesky', bg: 'bg-blue-400', href: (url: string, title: string) => `https://bsky.app/intent/compose?text=${encodeURIComponent(title + ' ' + url)}` },
  { name: 'Buffer', bg: 'bg-gray-600', href: (url: string, title: string) => `https://buffer.com/add?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { name: 'Copy', bg: 'bg-green-700', href: (url: string, title: string) => url },
  { name: 'Diaspora', bg: 'bg-gray-800', href: (url: string, title: string) => `https://share.diasporafoundation.org/?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { name: 'Digg', bg: 'bg-gray-500', href: (url: string, title: string) => `http://digg.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Diigo', bg: 'bg-blue-500', href: (url: string, title: string) => `https://www.diigo.com/post?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Douban', bg: 'bg-green-600', href: (url: string, title: string) => `https://www.douban.com/share/service?href=${encodeURIComponent(url)}&name=${encodeURIComponent(title)}` },
  { name: 'Email', bg: 'bg-gray-400', href: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  { name: 'Evernote', bg: 'bg-green-500', href: (url: string, title: string) => `https://www.evernote.com/clip.action?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Facebook', bg: 'bg-[#3b5998]', href: (url: string, title: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: 'Fark', bg: 'bg-purple-500', href: (url: string, title: string) => `https://www.fark.com/cgi/farkit.pl?u=${encodeURIComponent(url)}&h=${encodeURIComponent(title)}` },
  { name: 'Flipboard', bg: 'bg-red-600', href: (url: string, title: string) => `https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { name: 'Gab', bg: 'bg-green-500', href: (url: string, title: string) => `https://gab.com/compose?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'Getpocket', bg: 'bg-red-500', href: (url: string, title: string) => `https://getpocket.com/save?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Gmail', bg: 'bg-red-500', href: (url: string, title: string) => `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  { name: 'Googlebookmarks', bg: 'bg-blue-500', href: (url: string, title: string) => `https://www.google.com/bookmarks/mark?op=edit&bkmk=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Hackernews', bg: 'bg-orange-500', href: (url: string, title: string) => `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}` },
  { name: 'Houzz', bg: 'bg-green-500', href: (url: string, title: string) => `https://www.houzz.com/imageClipperUpload?imageUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Instapaper', bg: 'bg-gray-700', href: (url: string, title: string) => `https://www.instapaper.com/edit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Iorbix', bg: 'bg-blue-700', href: (url: string, title: string) => `https://iorbix.com/share-link?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Kakao', bg: 'bg-yellow-400', href: (url: string, title: string) => `https://story.kakao.com/share?url=${encodeURIComponent(url)}` },
  { name: 'Kindleit', bg: 'bg-orange-600', href: (url: string, title: string) => `https://www.amazon.com/gp/sendtokindle?url=${encodeURIComponent(url)}` },
  { name: 'Kooapp', bg: 'bg-yellow-500', href: (url: string, title: string) => `https://www.kooapp.com/create?title=${encodeURIComponent(title)}&link=${encodeURIComponent(url)}` },
  { name: 'Line', bg: 'bg-green-500', href: (url: string, title: string) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}` },
  { name: 'LinkedIn', bg: 'bg-[#0077b5]', href: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Livejournal', bg: 'bg-blue-500', href: (url: string, title: string) => `https://www.livejournal.com/update.bml?subject=${encodeURIComponent(title)}&event=${encodeURIComponent(url)}` },
  { name: 'Mailru', bg: 'bg-blue-500', href: (url: string, title: string) => `https://connect.mail.ru/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Meneame', bg: 'bg-orange-500', href: (url: string, title: string) => `https://www.meneame.net/submit.php?url=${encodeURIComponent(url)}` },
  { name: 'Messenger', bg: 'bg-blue-500', href: (url: string, title: string) => `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}` },
  { name: 'Microsoftteams', bg: 'bg-blue-700', href: (url: string, title: string) => `https://teams.microsoft.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Naver', bg: 'bg-green-600', href: (url: string, title: string) => `https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Nextdoor', bg: 'bg-green-500', href: (url: string, title: string) => `https://nextdoor.com/news_feed/?post=${encodeURIComponent(url)}` },
  { name: 'Odnoklassniki', bg: 'bg-orange-500', href: (url: string, title: string) => `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Outlook', bg: 'bg-blue-600', href: (url: string, title: string) => `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  { name: 'Pinboard', bg: 'bg-blue-600', href: (url: string, title: string) => `https://pinboard.in/add?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Pinterest', bg: 'bg-red-600', href: (url: string, title: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}` },
  { name: 'Plurk', bg: 'bg-orange-500', href: (url: string, title: string) => `https://www.plurk.com/?qualifier=shares&status=${encodeURIComponent(url + ' ' + title)}` },
  { name: 'Print', bg: 'bg-black', href: (url: string, title: string) => `javascript:window.print()` },
  { name: 'Qzone', bg: 'bg-yellow-400', href: (url: string, title: string) => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Reddit', bg: 'bg-[#ff4500]', href: (url: string, title: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Refind', bg: 'bg-blue-500', href: (url: string, title: string) => `https://refind.com/?url=${encodeURIComponent(url)}` },
  { name: 'Renren', bg: 'bg-blue-600', href: (url: string, title: string) => `http://widget.renren.com/dialog/share?resourceUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Skype', bg: 'bg-blue-500', href: (url: string, title: string) => `https://web.skype.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'Surfingbird', bg: 'bg-blue-400', href: (url: string, title: string) => `https://surfingbird.ru/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Telegram', bg: 'bg-blue-500', href: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'Tencentqq', bg: 'bg-blue-500', href: (url: string, title: string) => `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Threema', bg: 'bg-black', href: (url: string, title: string) => `https://threema.id/compose?text=${encodeURIComponent(title + ' ' + url)}` },
  { name: 'Trello', bg: 'bg-blue-500', href: (url: string, title: string) => `https://trello.com/add-card?url=${encodeURIComponent(url)}&name=${encodeURIComponent(title)}` },
  { name: 'Tumblr', bg: 'bg-blue-900', href: (url: string, title: string) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Twitter', bg: 'bg-[#1da1f2]', href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: 'Vk', bg: 'bg-[#4c75a3]', href: (url: string, title: string) => `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Viber', bg: 'bg-purple-600', href: (url: string, title: string) => `viber://forward?text=${encodeURIComponent(title + ' ' + url)}` },
  { name: 'Wechat', bg: 'bg-green-500', href: (url: string, title: string) => `https://share.wechat.com/?url=${encodeURIComponent(url)}` },
  { name: 'Weibo', bg: 'bg-orange-600', href: (url: string, title: string) => `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'WhatsApp', bg: 'bg-[#25d366]', href: (url: string, title: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}` },
  { name: 'Wordpress', bg: 'bg-blue-700', href: (url: string, title: string) => `https://wordpress.com/press-this.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}` },
  { name: 'Xing', bg: 'bg-green-700', href: (url: string, title: string) => `https://www.xing.com/app/user?op=share&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { name: 'Yahoomail', bg: 'bg-purple-600', href: (url: string, title: string) => `https://compose.mail.yahoo.com/?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
  { name: 'Yummly', bg: 'bg-orange-500', href: (url: string, title: string) => `https://www.yummly.com/urb/verify?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
]

// 添加CSS动画样式
const fadeIn = "animate-fadeIn"
const scaleIn = "animate-scaleIn"
const slideUp = "animate-slideUp"

const ShareModal = ({ title, url, onClose }: { title: string, url: string, onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/0 animate-fadeBackdrop" 
      onClick={onClose}
      style={{ backdropFilter: 'blur(0px)' }}
    >
      <style jsx global>{`
        @keyframes fadeBackdrop {
          from { background-color: rgba(0, 0, 0, 0); backdrop-filter: blur(0px); }
          to { background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(2px); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes rotateIn {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0); opacity: 1; }
        }
        
        .animate-fadeBackdrop {
          animation: fadeBackdrop 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.3s ease-out forwards;
        }
        
        .delay-item {
          opacity: 0;
        }
      `}</style>
      
      <div 
        className="bg-white rounded-lg p-6 max-w-5xl w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto max-h-[80vh] animate-scaleIn relative" 
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200 z-10 delay-item"
          aria-label="关闭分享窗口"
          style={{ 
            animationName: 'rotateIn',
            animationDuration: '0.3s',
            animationFillMode: 'forwards',
            animationDelay: '0.2s' 
          }}
        >
          <FaTimes className="w-4 h-4" />
        </button>
        
        {allPlatforms.map((platform, index) => (
          <a
            key={platform.name}
            href={platform.href(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.name}`}
            tabIndex={0}
            className={`flex items-center gap-2 px-3 py-2 rounded text-white font-medium shadow-sm hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${platform.bg} delay-item`}
            style={{ 
              animationName: 'slideUp',
              animationDuration: '0.3s',
              animationFillMode: 'forwards',
              animationDelay: `${0.05 + index * 0.02}s` 
            }}
          >
            {getPlatformIcon(platform.name)}
            <span className="truncate">{platform.name}</span>
          </a>
        ))}
        <div 
          className="col-span-2 sm:col-span-4 md:col-span-6 mt-4 text-center text-xs text-gray-500 delay-item"
          style={{ 
            animationName: 'fadeIn',
            animationDuration: '0.5s',
            animationFillMode: 'forwards',
            animationDelay: '0.5s' 
          }}
        >
          Third-party platform trademarks and logos appearing here are owned by the respective third parties, link to those referenced platforms, and are not affiliated with ShareThis.
        </div>
      </div>
    </div>
  )
}

const ShareBar = ({ title, url }: ShareBarProps) => {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div className="bg-gray-100 rounded-2xl px-4 py-4 flex flex-col items-center my-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {mainPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.name}`}
            tabIndex={0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium shadow-sm hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${platform.bg}`}
          >
            {getPlatformIcon(platform.name)}
            <span className="hidden sm:inline">{platform.name}</span>
          </a>
        ))}
        <button
          onClick={() => setShowModal(true)}
          aria-label="Show all share options"
          tabIndex={0}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium shadow-sm bg-gray-700 hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          <FaShareAlt />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
      {showModal && <ShareModal title={title} url={url} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default ShareBar 