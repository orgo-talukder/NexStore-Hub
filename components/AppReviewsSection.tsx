'use client';

import React, { useState } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  CheckCircle2, 
  ThumbsUp, 
  ShieldCheck, 
  Smartphone, 
  X, 
  Sparkles,
  User
} from 'lucide-react';
import { useAppReviews, type UserReview } from '@/lib/reviewsStore';
import type { AppItem } from '@/lib/supabase';

export function AppReviewsSection({ app }: { app: AppItem }) {
  const { reviews, addReview } = useAppReviews(app.id);
  const [showModal, setShowModal] = useState(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  // Form states
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculate statistics
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : app.rating || '5.0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;

    setIsSubmitting(true);
    try {
      await addReview({
        appId: app.id,
        userName: name.trim(),
        rating,
        title: title.trim() || `${rating} Star Review`,
        comment: comment.trim(),
        deviceModel: deviceModel.trim() || 'Android Device',
        verifiedDownload: true,
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
        setName('');
        setTitle('');
        setComment('');
        setDeviceModel('');
        setRating(5);
      }, 1200);
    } catch (err) {
      console.error('Failed to post review:', err);
      setIsSubmitting(false);
    }
  };

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="glass-panel rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border-glass mt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-glass/60 pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white flex items-center gap-2.5">
            <span>Ratings & Reviews</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-electric-blue/15 text-electric-blue border border-electric-blue/30 font-mono">
              {totalReviews} Reviews
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Real feedback from community users who downloaded {app.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-sm font-semibold hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-electric-blue/20"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Rating Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-deep-navy-solid/60 rounded-2xl p-6 border border-border-glass/40">
        {/* Score Column */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center sm:border-r border-border-glass/40 sm:pr-6">
          <div className="text-5xl font-outfit font-extrabold text-white tracking-tight">
            {averageRating}
          </div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? 'text-star-rating fill-star-rating'
                    : 'text-text-muted/40'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-text-muted">
            Based on {totalReviews} community ratings
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="md:col-span-8 space-y-2">
          {ratingCounts.map((item) => (
            <div key={item.star} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-10 text-text-muted font-medium">
                <span>{item.star}</span>
                <Star className="w-3 h-3 text-star-rating fill-star-rating" />
              </div>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-electric-blue to-cyber-purple rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="w-10 text-right text-text-muted font-mono">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => {
          const isLiked = helpfulLiked[rev.id];
          const displayLikes = rev.helpfulCount + (isLiked ? 1 : 0);

          return (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-deep-navy-solid/40 border border-border-glass/50 hover:border-electric-blue/30 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* User Avatar Circle */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue/30 to-cyber-purple/30 border border-white/10 flex items-center justify-center text-white font-bold font-outfit text-sm">
                    {rev.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm font-outfit">
                        {rev.userName}
                      </span>
                      {rev.verifiedDownload && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating
                                ? 'text-star-rating fill-star-rating'
                                : 'text-text-muted/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-text-muted">
                        • {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {rev.deviceModel && (
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-text-muted bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                    <Smartphone className="w-3 h-3 text-electric-blue" />
                    <span>{rev.deviceModel}</span>
                  </div>
                )}
              </div>

              {/* Review Title & Content */}
              <div>
                {rev.title && (
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {rev.title}
                  </h4>
                )}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {rev.comment}
                </p>
              </div>

              {/* Helpful Action */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs text-text-muted">
                <span>Did this review help you?</span>
                <button
                  type="button"
                  onClick={() => toggleHelpful(rev.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
                    isLiked
                      ? 'bg-electric-blue/20 border-electric-blue text-electric-blue'
                      : 'bg-white/5 border-border-glass hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                  <span>Helpful ({displayLikes})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#091024] border border-electric-blue/40 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyber-purple/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-electric-blue/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10 border-b border-border-glass pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-electric-blue" />
                <h3 className="text-lg sm:text-xl font-outfit font-bold text-white">
                  Review {app.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full text-text-muted hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 relative z-10">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-outfit font-bold text-white">Review Submitted!</h4>
                <p className="text-xs text-text-secondary max-w-xs">
                  Thank you for contributing your honest feedback to the NexStore community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Star Picker */}
                <div className="text-center space-y-2 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Your Rating
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-star-rating fill-star-rating'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-electric-blue font-semibold">
                    {rating === 5 ? 'Excellent 🌟' : rating === 4 ? 'Very Good 👍' : rating === 3 ? 'Average 👌' : rating === 2 ? 'Needs Improvement ⚠️' : 'Poor ❌'}
                  </span>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asif Karim"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Device Model (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Samsung S23, Pixel 8"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-electric-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Review Headline (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Super smooth and responsive"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Detailed Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share what you liked, app stability, performance, or suggestions..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:border-electric-blue resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-border-glass text-text-secondary text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !comment.trim()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-xs sm:text-sm font-bold hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-electric-blue/30"
                  >
                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
